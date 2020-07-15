using System.ComponentModel.DataAnnotations;

namespace Server.Dtos
{
    public class CategoryDto
    {
        public int Id { get; set; }
        [Required]
        [StringLength(50)]
        public string Title { get; set; }
        [StringLength(400)]
        public string Description { get; set; }
    }
}