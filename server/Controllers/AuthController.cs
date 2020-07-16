using System;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Server.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Server.Dtos;
using System.Net.Http;
using System.Net;

namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;

        public AuthController(UserManager<User> userManager, IMapper mapper)
        {
            _userManager = userManager;
            _mapper = mapper;
        }

        [HttpGet]
        [Authorize]
        public async Task<UserDto> GetAccountInfo()
        {
            var currentUser = await _userManager.GetUserAsync(HttpContext.User);
            return _mapper.Map<UserDto>(currentUser);
        }

        [HttpPost]
        [Route("Create")]
        public async Task<ActionResult<UserDto>> Create([FromBody] string[] usernameAndPassword)
        {
            var username = usernameAndPassword[0];
            var password = usernameAndPassword[1];

            var user = new User
            {
                Id = Guid.NewGuid().ToString(),
                Username = username
            };

            var identityResult = await _userManager.CreateAsync(user, password);

            if (identityResult.Errors.Any())
            {
                return BadRequest(identityResult.Errors.Select(e => e.Description));
            }
            else
            {
                return _mapper.Map<UserDto>(user);
            }
        }

        [HttpPost]
        [Route("Login")]
        public async Task<ActionResult<UserDto>> Login([FromBody] string[] usernameAndPassword)
        {
            var username = usernameAndPassword[0];
            var password = usernameAndPassword[1];

            var user = await _userManager.FindByNameAsync(username);

            if (user == null)
            {
                return Unauthorized();
            }

            if (await _userManager.CheckPasswordAsync(user, password))
            {
                var identity = new ClaimsIdentity("cookies");
                identity.AddClaim(new Claim(ClaimTypes.NameIdentifier, user.Id));
                identity.AddClaim(new Claim(ClaimTypes.Name, user.Username));
                await HttpContext.SignInAsync("cookies", new ClaimsPrincipal(identity), new AuthenticationProperties { IsPersistent = true });

                return _mapper.Map<UserDto>(user);
            }
            else
            {
                return Unauthorized();
            }
        }

        [HttpPost]
        [Route("Logout")]
        public async Task Logout()
        {
            await HttpContext.SignOutAsync("cookies");
        }
    }
}