using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Datamodel.Models
{
    public class Forum
    {
        public int Id { get; set; }
        public virtual User Author { get; set; }
        public virtual Category Category { get; set; }
        [StringLength(100)]
        public string Title { get; set; }
        [StringLength(4000)]
        public string Text { get; set; }
        public DateTimeOffset CreationDate { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
    }
}