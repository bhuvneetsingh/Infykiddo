using System;
using System.Collections.Generic;

#nullable disable

namespace Infy_new.Models
{
    public partial class UserCourseMap
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int CourseId { get; set; }

        public virtual Course Course { get; set; }
        public virtual User User { get; set; }
    }
}
