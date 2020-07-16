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

namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ForumController : Controller
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;

        public ForumController(AppDbContext context,
            IMapper mapper, UserManager<User> userManager)
        {
            _context = context;
            _mapper = mapper;
            _userManager = userManager;
        }

        [HttpGet]
        [Route("{forumId}")]
        public async Task<ActionResult<ForumDto>> GetForum(int forumId)
        {
            var forum = await _context.Forums
                .Include(o => o.Author)
                .Include(o => o.Category)
                .Where(o => o.Id == forumId)
                .FirstOrDefaultAsync();

            if (forum == null)
            {
                return BadRequest("Forum not found.");
            }

            return _mapper.Map<ForumDto>(forum);
        }

        [HttpGet]
        [Route("Search")]
        public async Task<ActionResult<ForumDto[]>> Search([FromQuery] string term,
            [FromQuery] int? itemsPerPage = null, [FromQuery] int? pageNumber = null)
        {
            if (string.IsNullOrEmpty(term))
            {
                return BadRequest("Search term must not be empty.");
            }

            var query = _context.Forums
                .Where(o => o.Title.Contains(term) || o.Text.Contains(term))
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

        [HttpGet]
        [Route("All")]
        public async Task<ActionResult<ForumDto[]>> All([FromQuery] int? itemsPerPage = null,
            [FromQuery] int? pageNumber = null)
        {
            var query = _context.Forums
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

        [HttpGet]
        [Route("{forumId}/ListComments")]
        public async Task<ActionResult<CommentDto[]>> ListComments([FromRoute] int forumId,
            [FromQuery] int? itemsPerPage = null, [FromQuery] int? pageNumber = null)
        {
            var forum = _context.Forums
                .Where(o => o.Id == forumId);

            if (!await forum.AnyAsync())
            {
                return BadRequest("Forum not found.");
            }

            var query = forum
                .SelectMany(o => o.Comments)
                .OrderByDescending(o => o.CreationDate)
                .AsQueryable();

            if (itemsPerPage != null && pageNumber != null)
            {
                query = query
                    .Skip((int)pageNumber * (int)itemsPerPage)
                    .Take((int)itemsPerPage);
            }

            return await query
                .ProjectTo<CommentDto>(_mapper.ConfigurationProvider)
                .ToArrayAsync();
        }

        [HttpPost]
        [Authorize]
        [Route("{forumId}/CreateComment")]
        public async Task<ActionResult<CommentDto>> CreateComment([FromRoute] int forumId,
            [FromBody] CommentDto newComment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var forum = await _context.Forums
                .Where(o => o.Id == forumId)
                .Include(o => o.Comments)
                .FirstOrDefaultAsync();

            if (forum == null)
            {
                return BadRequest("Forum not found.");
            }

            var comment = new Comment
            {
                Author = await _userManager.GetUserAsync(HttpContext.User),
                Text = newComment.Text,
                CreationDate = DateTimeOffset.Now
            };

            forum.Comments.Add(comment);
            await _context.SaveChangesAsync();

            return _mapper.Map<CommentDto>(comment);
        }

        [HttpGet]
        [Route("Comment/{commentId}/ListChildComments")]
        public async Task<ActionResult<ChildCommentDto[]>> ListChildComments([FromRoute] int commentId,
            [FromQuery] int? itemsPerPage = null, [FromQuery] int? pageNumber = null)
        {
            var parentComment = _context.Comments
                .Where(o => o.Id == commentId);

            if (!await parentComment.AnyAsync())
            {
                return BadRequest("Comment not found.");
            }

            var query = parentComment
                .SelectMany(o => o.ChildComments)
                .OrderByDescending(o => o.CreationDate)
                .AsQueryable();

            if (itemsPerPage != null && pageNumber != null)
            {
                query = query
                    .Skip((int)pageNumber * (int)itemsPerPage)
                    .Take((int)itemsPerPage);
            }

            return await query
                .ProjectTo<ChildCommentDto>(_mapper.ConfigurationProvider)
                .ToArrayAsync();
        }

        [HttpPost]
        [Authorize]
        [Route("Comment/{CommentId}/CreateChildComment")]
        public async Task<ActionResult<ChildCommentDto>> CreateChildComment([FromRoute] int commentId,
            [FromBody] ChildCommentDto newChildComment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var parentComment = await _context.Comments
                .Where(o => o.Id == commentId)
                .Include(o => o.ChildComments)
                .FirstOrDefaultAsync();

            if (parentComment == null)
            {
                return BadRequest("Comment not found.");
            }

            var comment = new ChildComment
            {
                Author = await _userManager.GetUserAsync(HttpContext.User),
                Text = newChildComment.Text,
                CreationDate = DateTimeOffset.Now
            };

            parentComment.ChildComments.Add(comment);
            await _context.SaveChangesAsync();

            return _mapper.Map<ChildCommentDto>(comment);
        }
    }
}