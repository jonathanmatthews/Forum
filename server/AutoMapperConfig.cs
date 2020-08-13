using AutoMapper;
using Server.Dtos;
using Datamodel.Models;

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