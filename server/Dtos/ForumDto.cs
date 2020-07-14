using System;
using System.ComponentModel.DataAnnotations;

namespace Server.Dtos
{
    public class ForumDto
    {
        public int Id { get; set; }
        public UserDto Author { get; set; }
        public CategoryDto Category { get; set; }
        [Required]
        [StringLength(100)]
        public string Title { get; set; }
        [StringLength(4000)]
        public string Text { get; set; }
        public DateTimeOffset CreationDate { get; set; }
    }
}