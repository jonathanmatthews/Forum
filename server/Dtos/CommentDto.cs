using System;
using System.ComponentModel.DataAnnotations;

namespace Server.Dtos
{
    public class CommentDto
    {
        public int Id { get; set; }
        public UserDto Author { get; set; }
        [Required]
        [StringLength(4000)]
        public string Text { get; set; }
        public DateTimeOffset CreationDate { get; set; }
        public int ChildCommentsCount { get; set; }
    }
}