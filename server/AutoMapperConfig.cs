using AutoMapper;
using Server.Dtos;
using Server.Models;

namespace Server
{
    public class DefaultProfile : Profile
    {
        public DefaultProfile()
        {
            CreateMap<Category, CategoryDto>();
            CreateMap<Forum, ForumDto>();
            CreateMap<User, UserDto>();
        }
    }
}