using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Datamodel.Models
{
    public class Category
    {
        public int Id { get; set; }

        [StringLength(50)]
        public string Title { get; set; }

        [StringLength(400)]
        public string Description { get; set; }

        public virtual ICollection<Forum> Forums { get; set; }
    }
}