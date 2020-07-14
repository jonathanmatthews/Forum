using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Server.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : Controller
    {
        private readonly UserManager<User> _userManager;

        public AuthController(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAccountInfo()
        {
            var currentUser = await _userManager.GetUserAsync(HttpContext.User);
            return Ok(new { currentUser?.Id, currentUser?.Username });
        }

        [HttpPost]
        [Route("[Action]")]
        public async Task<IActionResult> Create([FromBody] string[] usernameAndPassword)
        {
            var username = usernameAndPassword[0];
            var password = usernameAndPassword[1];

            var user = await _userManager.FindByNameAsync(username);

            if (user != null)
            {
                return BadRequest();
            }

            user = new User
            {
                Id = Guid.NewGuid().ToString(),
                Username = username
            };

            await _userManager.CreateAsync(user, password);

            return Ok(user);

        }

        [HttpPost]
        [Route("[Action]")]
        public async Task<IActionResult> Login([FromBody] string[] usernameAndPassword)
        {
            var username = usernameAndPassword[0];
            var password = usernameAndPassword[1];

            var user = await _userManager.FindByNameAsync(username);

            if (user == null)
            {
                return BadRequest();
            }

            if (await _userManager.CheckPasswordAsync(user, password))
            {
                var identity = new ClaimsIdentity("cookies");
                identity.AddClaim(new Claim(ClaimTypes.NameIdentifier, user.Id));
                identity.AddClaim(new Claim(ClaimTypes.Name, user.Username));
                await HttpContext.SignInAsync("cookies", new ClaimsPrincipal(identity), new AuthenticationProperties { IsPersistent = true });

                return Ok(new { user.Id, user.Username });
            }
            else
            {
                return Ok(false);
            }
        }
    }
}