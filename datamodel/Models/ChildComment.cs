using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Datamodel.Models
{
    public class ChildComment
    {
        public int Id { get; set; }
        public virtual User Author { get; set; }
        public virtual Comment Comment { get; set; }

        [StringLength(4000)]
        public string Text { get; set; }
        public DateTimeOffset CreationDate { get; set; }
    }
}