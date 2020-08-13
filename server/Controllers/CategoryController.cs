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
using Datamodel.Infrastructure;
using Datamodel.Models;

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
        [Route("CountCategories")]
        public async Task<ActionResult<int>> CountCategories()
        {
            return await _context.Categories.CountAsync();
        }

        [HttpGet]
        [Route("ListCategories")]
        public async Task<ActionResult<CategoryDto[]>> ListCategories([FromQuery] int? itemsPerPage = null,
            [FromQuery] int? pageNumber = null)
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
        [Route("CreateCategory")]
        public async Task<ActionResult<CategoryDto>> CreateCategory([FromBody] CategoryDto newCategory)
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

            return _mapper.Map<CategoryDto>(category);
        }

        [HttpGet]
        [Route("{categoryId}/CountForums")]
        public async Task<ActionResult<int>> CountForums([FromRoute] int categoryId)
        {
            var category = _context.Categories
                .Where(o => o.Id == categoryId);

            if (!await category.AnyAsync())
            {
                return BadRequest("Category not found.");
            }

            return await category
                .SelectMany(o => o.Forums)
                .CountAsync();
        }

        [HttpGet]
        [Route("{categoryId}/ListForums")]
        public async Task<ActionResult<ForumDto[]>> ListForums([FromRoute] int categoryId,
            [FromQuery] int? itemsPerPage = null, [FromQuery] int? pageNumber = null)
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

            return await query
                .ProjectTo<ForumDto>(_mapper.ConfigurationProvider)
                .ToArrayAsync();
        }

        [HttpPost]
        [Authorize]
        [Route("{categoryId}/CreateForum")]
        public async Task<ActionResult<ForumDto>> CreateForum([FromRoute] int categoryId,
            [FromBody] ForumDto newForum)
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

            return _mapper.Map<ForumDto>(forum);
        }
    }
}