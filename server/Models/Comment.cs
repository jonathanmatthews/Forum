using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Server.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public virtual User Author { get; set; }
        public virtual Forum Forum { get; set; }
        [StringLength(4000)]
        public string Text { get; set; }
        public DateTimeOffset CreationDate { get; set; }
        public virtual ICollection<ChildComment> ChildComments { get; set; }
    }
}