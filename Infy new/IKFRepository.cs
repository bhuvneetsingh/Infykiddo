/* References https://infyspringboard.onwingspan.com/en/app/toc/lex_auth_012783573027553280622_shared/overview */
using Infy_new.Models;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Infy_new
{
	public class IKFRepository
	{
            infykiddoContext context;
            public IKFRepository()
            {
                context = new infykiddoContext();
            }
        public List<User> GetUserDetails()
        {
                var UserDetails = context.Users
                            .OrderBy(c => c.UserId)
                            .ToList();
                return UserDetails;    
        }
        public List<User> UserProfile(int Id)
        {
            var UserDetails = (from User in context.Users
                                 where User.UserId == Id
                                 select User).ToList();
            return UserDetails;
        }
        public List<Trainer> Trainer(int Id)
        {
            var UserDetails = (from Trainer in context.Trainers
                               where Trainer.TrainerId == Id
                               select Trainer).ToList();
            return UserDetails;
        }
        public List<Course> GetCourseDetails()
        {
            
            var CourseDetails = (from Course in context.Courses
                                 where Course.Approval==false
                                 select Course).ToList();
            return CourseDetails;
        }
        public List<Course> Trainercourses(int Id)
        {

            var CourseDetails = (from Course in context.Courses
                                 where Course.Approval == true && Course.TrainerId==Id
                                 select Course).ToList();
            return CourseDetails;
        }
        public List<Course> Viewcourses(int Id)
        {

            var CourseDetails = (from Course in context.Courses
                                 where Course.CourseId == Id
                                 select Course).ToList();
            return CourseDetails;
        }
        public List<Course> Parentcourses(int Id)
        {
            List<Models.User> user = null;
            user = (from User in context.Users
                        where User.UserId == Id
                        select User).ToList();
			var CourseDetails = (from Course in context.Courses
								 where Course.MinAge <= user[0].Lage
								 && Course.MaxAge >= user[0].Lage
								 select Course).ToList();
			return CourseDetails;
        }
        public List<Course> Learnercourses(int Id)
        {
            var CourseDetails = (from Course in context.Courses
                                 join UserCourseMap in context.UserCourseMaps on Course.CourseId equals UserCourseMap.CourseId
                                 where UserCourseMap.UserId ==Id
                                 select Course).ToList();
            return CourseDetails;
        }
        public bool AddUser(string Email,string Pname,string Lname,int Lage, string Password)
        {
            bool status = false;
            User category = new User();
            category.Email = Email;
            category.Pname = Pname;
            category.Lname = Lname;
            category.Lage = Lage;
            category.Password = Password;
            try
            {
                context.Users.Add(category);
                context.SaveChanges();
                status = true;
            }
            catch (Exception)
            {
                status = false;
            }
            return status;
        }
        public bool AddCourse(int id, string Cname, int MinAge, int MaxAge, int Cdur, string PreReq, string Cdesc, bool Approval)
        {
            bool status = false;
            Course category = new Course();
            category.TrainerId = id;
            category.Cname = Cname;
            category.MinAge = MinAge;
            category.MaxAge = MaxAge;
            category.Cdur = Cdur;
            category.PreReq = PreReq;
            category.Cdesc = Cdesc;
            category.Approval = Approval;
            try
            {
                context.Courses.Add(category);
                context.SaveChanges();
                status = true;
            }
            catch (Exception)
            {
                status = false;
            }
            return status;
        }

        public bool AddTrainer(string Email, string Tname, string Cnum, string Password)
        {
            bool status = false;
            Trainer category = new Trainer();
            category.Email = Email;
            category.Tname = Tname;
            category.Cnum = Cnum;
            category.Password = Password;
            try
            {
            context.Trainers.Add(category);
            context.SaveChanges();
            status = true;
            }
            catch (Exception)
            {
                status = false;
            }
            return status;
        }
        public bool Enroll(int UserId, int CourseId) { 
            bool status = false;
            UserCourseMap category = new UserCourseMap();
            category.UserId = UserId;
            category.CourseId = CourseId;
			try
			{
            context.UserCourseMaps.Add(category);
            context.SaveChanges();
            status = true;
		}
			catch (Exception) { 

			    status = false;
			}
			return status;
        }

        public string ValidateLoginUsingLinq(int UserId, string Password)
        {
            string roleName = "";
            //try
            //{
                var objUser = (from user in context.Users
                               where user.UserId == UserId && user.Password == Password select user);
                if (objUser != null)
                {
                    roleName = "Valid Credentials";
                }
                else
                {
                    roleName = "Invalid credentials";
                }
           // }
            //catch (Exception)
            //{
            //    roleName = "Invalid credentials";
            //}
            return roleName;
        }
        public string ValidateSLoginUsingLinq(string Lname, string Password)
        {
            string roleName = "";
            try
            {
                var objUser = (from user in context.Users
                               where user.Lname == Lname && user.Password == Password
                               select user);
                if (objUser != null)
                {
                    roleName = "Valid Credentials";
                }
                else
                {
                    roleName = "Invalid credentials";
                }
            }
            catch (Exception)
            {
                roleName = "Invalid credentials";
            }
            return roleName;
        }
        public string ValidateTLoginUsingLinq(int TrainerId, string Password)
        {
            string roleName = "";
            try
            {
                var objUser = (from Trainer in context.Trainers
                               where Trainer.TrainerId == TrainerId && Trainer.Password == Password
                               select Trainer);
                if (objUser != null)
                {
                    roleName = "Valid Credentials";
                }
                else
                {
                    roleName = "Invalid credentials";
                }
            }
            catch (Exception)
            {
                roleName = "Invalid credentials";
            }
            return roleName;
        }
        public bool DeleteCourse(int CourseId)
        {
            bool status = false;
            try
            {
                var product = (from Course in context.Courses
                               where Course.CourseId == CourseId
                               select Course).FirstOrDefault<Course>();
                context.Courses.Remove(product);
                context.SaveChanges();
                status = true;
            }
            catch (Exception ex)
            {
                status = false;
            }
            return status;
        }
        public bool Update(int CourseId,bool Approval)
        {
            bool status = false;

            Course cartproduct = null;
            try
            {

                cartproduct = (from Course
                               in context.Courses where Course.CourseId == CourseId select Course).FirstOrDefault<Course>();
                if (cartproduct != null)
                {
                    cartproduct.Approval = Approval;
                    context.SaveChanges();
                    status = true;
                }
                else
                {
                    status = false;
                }
            }
            catch (Exception )
            {
                     status = false;
            }
            return status;
        }

    }
}
