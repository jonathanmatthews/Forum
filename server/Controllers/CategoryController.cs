using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Dtos;
using Server.Infrastructure;
using Server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CategoryController : Controller
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;

        public CategoryController(AppDbContext context,
            IMapper mapper, UserManager<User> userManager)
        {
            _context = context;
            _mapper = mapper;
            _userManager = userManager;
        }

        [HttpGet]
        [Route("[Action]")]
        public async Task<int> CountCategories()
        {
            return await _context.Categories.CountAsync();
        }

        [HttpGet]
        [Route("[Action]")]
        public async Task<CategoryDto[]> ListCategories([FromQuery] int? itemsPerPage = null, [FromQuery] int? pageNumber = null)
        {
            var query = _context.Categories
                .OrderBy(o => o.Title)
                .AsQueryable();

            if (itemsPerPage != null && pageNumber != null)
            {
                query = query
                    .Skip((int)pageNumber * (int)itemsPerPage)
                    .Take((int)itemsPerPage);
            }

            return await query
                .ProjectTo<CategoryDto>(_mapper.ConfigurationProvider)
                .ToArrayAsync();
        }

        [HttpPost]
        [Authorize]
        [Route("[Action]")]
        public async Task<IActionResult> CreateCategory([FromBody] CategoryDto newCategory)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var category = new Category
            {
                Title = newCategory.Title,
                Description = newCategory.Description
            };

            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            return Ok(_mapper.Map<CategoryDto>(category));
        }

        [HttpGet]
        [Route("{categoryId}/[Action]")]
        public async Task<IActionResult> CountForums([FromRoute] int categoryId)
        {
            var category = _context.Categories
                .Where(o => o.Id == categoryId);

            if (!await category.AnyAsync())
            {
                return BadRequest("Category not found.");
            }

            return Ok(await category
                .SelectMany(o => o.Forums)
                .CountAsync());
        }

        [HttpGet]
        [Route("{categoryId}/[Action]")]
        public async Task<IActionResult> ListForums([FromRoute] int categoryId, [FromQuery] int? itemsPerPage = null, [FromQuery] int? pageNumber = null)
        {
            var category = _context.Categories
                .Where(o => o.Id == categoryId);

            if (!await category.AnyAsync())
            {
                return BadRequest("Category not found.");
            }

            var query = category
                .SelectMany(o => o.Forums)
                .OrderByDescending(o => o.CreationDate)
                .AsQueryable();

            if (itemsPerPage != null && pageNumber != null)
            {
                query = query
                    .Skip((int)pageNumber * (int)itemsPerPage)
                    .Take((int)itemsPerPage);
            }

            return Ok(await query
            .ProjectTo<ForumDto>(_mapper.ConfigurationProvider)
            .ToArrayAsync());
        }

        [HttpPost]
        [Authorize]
        [Route("{categoryId}/[Action]")]
        public async Task<IActionResult> CreateForum([FromRoute] int categoryId, [FromBody] ForumDto newForum)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var category = await _context.Categories
                .Where(o => o.Id == categoryId)
                .Include(o => o.Forums)
                .FirstOrDefaultAsync();

            if (category == null)
            {
                return BadRequest("Category not found.");
            }

            var forum = new Forum
            {
                Author = await _userManager.GetUserAsync(HttpContext.User),
                Title = newForum.Title,
                Text = newForum.Text,
                CreationDate = DateTimeOffset.Now
            };

            category.Forums.Add(forum);
            await _context.SaveChangesAsync();

            return Ok(_mapper.Map<ForumDto>(forum));
        }
    }
}