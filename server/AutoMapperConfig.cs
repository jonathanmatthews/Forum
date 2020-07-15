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
            CreateMap<Comment, CommentDto>();
            CreateMap<ChildComment, ChildCommentDto>();
            CreateMap<User, UserDto>();
        }
    }
}