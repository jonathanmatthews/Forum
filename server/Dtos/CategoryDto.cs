using System.ComponentModel.DataAnnotations;

namespace Server.Dtos
{
    public class CategoryDto
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        public string Description { get; set; }
    }
}