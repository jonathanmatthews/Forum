using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Dtos;
using Server.Infrastructure;

namespace server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CategoryController : Controller
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public CategoryController(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<CategoryDto[]> GetCategories()
        {
            return await _context.Categories
                .ProjectTo<CategoryDto>(_mapper.ConfigurationProvider)
                .ToArrayAsync();
        }
    }
}