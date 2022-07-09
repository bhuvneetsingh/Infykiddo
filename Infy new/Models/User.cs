using System;
using System.Collections.Generic;

#nullable disable

namespace Infy_new.Models
{
    public partial class User
    {
        public User()
        {
            UserCourseMaps = new HashSet<UserCourseMap>();
        }

        public int UserId { get; set; }
        public string Email { get; set; }
        public string Pname { get; set; }
        public string Lname { get; set; }
        public int Lage { get; set; }
        public string Password { get; set; }

        public virtual ICollection<UserCourseMap> UserCourseMaps { get; set; }
    }
}
