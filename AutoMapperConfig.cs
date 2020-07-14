using AutoMapper;

namespace Server
{
    public class DefaultProfile : Profile
    {
        public DefaultProfile()
        {
            CreateMap<Category, CategoryDto>();
        }
    }
}