using System;
using System.Collections.Generic;

#nullable disable

namespace Infy_new.Models
{
    public partial class Trainer
    {
        public Trainer()
        {
            Courses = new HashSet<Course>();
        }

        public int TrainerId { get; set; }
        public string Tname { get; set; }
        public string Cnum { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public virtual ICollection<Course> Courses { get; set; }
    }
}
