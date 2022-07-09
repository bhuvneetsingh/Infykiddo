using System;
using System.Collections.Generic;

#nullable disable

namespace Infy_new.Models
{
    public partial class Course
    {
        public Course()
        {
            UserCourseMaps = new HashSet<UserCourseMap>();
        }

        public int TrainerId { get; set; }
        public int CourseId { get; set; }
        public string Cname { get; set; }
        public int MinAge { get; set; }
        public int MaxAge { get; set; }
        public int Cdur { get; set; }
        public string PreReq { get; set; }
        public string Cdesc { get; set; }
        public bool Approval { get; set; }

        public virtual Trainer Trainer { get; set; }
        public virtual ICollection<UserCourseMap> UserCourseMaps { get; set; }
    }
}
