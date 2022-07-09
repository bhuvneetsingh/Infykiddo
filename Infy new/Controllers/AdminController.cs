/* References https://infyspringboard.onwingspan.com/en/app/toc/lex_auth_0126188504732139522138_shared/overview */
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Infy_new.Models;
using Microsoft.AspNetCore.Session;

namespace Infy_new.Controllers
{
	[Route("api/[controller]/[Action]")]
	[ApiController]
	public class AdminController : Controller
	{
		const string SessionId = "_Id";
		const string SessionView = "_View";
		IKFRepository Repository;
		public AdminController()
		{
			Repository = new IKFRepository();
		}
		public JsonResult GetUsers()
		{
			List<Models.User> UserList = null;
			try
			{
				UserList = Repository.GetUserDetails();
			}
			catch (Exception ex)
			{
				UserList = null;
			}
			return Json(UserList);
		}
		public JsonResult UserProfile()
		{
			var Id = HttpContext.Session.GetInt32(SessionId);
			int Id1 = (int)Id;
			List<Models.User> UserList = null;
			try
			{
				UserList = Repository.UserProfile(Id1);
			}
			catch (Exception ex)
			{
				UserList = null;
			}
			return Json(UserList);
		}
		public JsonResult Trainer()
		{
			var Id = HttpContext.Session.GetInt32(SessionId);
			int Id1 = (int)Id;
			List<Models.Trainer> trainerList = null;
			try
			{
				trainerList = Repository.Trainer(Id1);
			}
			catch (Exception ex)
			{
				trainerList = null;
			}
			return Json(trainerList);
		}
		[HttpPut]
		public JsonResult Update(Models.Course cartObj)
		{
			bool status = false;
			try
			{
				status = Repository.Update(cartObj.CourseId,cartObj.Approval);
			}
			catch (Exception)
			{
				status = false;
			}

			return Json(status);
		}
		public JsonResult GetCourses()
		{
			List<Models.Course> CourseList = null;
			try
			{
				CourseList = Repository.GetCourseDetails();
			}
			catch (Exception ex)
			{
				CourseList = null;
			}
			return Json(CourseList);
		}
		public JsonResult Trainercourses()
		{
			var Id = HttpContext.Session.GetInt32(SessionId);
			List<Models.Course> CourseList = null;
			try
			{
			int Id1 = (int)Id;
			CourseList = Repository.Trainercourses(Id1);
			}
			catch (Exception ex)
			{
				CourseList = null;
			}
			return Json(CourseList);
		}
		public JsonResult Parentcourses()
		{
			var Id = HttpContext.Session.GetInt32(SessionId);
			List<Models.Course> CourseList = null;
try
{
			int Id1 = (int)Id;
			CourseList = Repository.Parentcourses(Id1);
}
catch (Exception ex)
{
	CourseList = null;
}
			return Json(CourseList);
		}
		public JsonResult Learnercourses()
		{
			var Id = HttpContext.Session.GetInt32(SessionId);
			List<Models.Course> CourseList = null;
try
{
			int Id1 = (int)Id;
			CourseList = Repository.Learnercourses(Id1);
}
catch (Exception ex)
{
	CourseList = null;
}
			return Json(CourseList);
		}
		public JsonResult Viewcourses()
		{
			var Id = HttpContext.Session.GetInt32(SessionView);
			List<Models.Course> CourseList = null;
			try
			{
			int Id1 = (int)Id;
			CourseList = Repository.Viewcourses(Id1);
			}
			catch (Exception ex)
			{
				CourseList = null;
			}
			return Json(CourseList);
		}
		[HttpPost]
		public JsonResult ValidateUserCredentials(User userObj)
		{
			string roleName = "";
			HttpContext.Session.SetInt32(SessionId, userObj.UserId);
			try
			{
				
				roleName = Repository.ValidateLoginUsingLinq(userObj.UserId, userObj.Password);

			}
			catch (Exception)
			{
				roleName = "Invalid credentials";
			}
			return Json(roleName);
		}
		[HttpPost]
		public bool Enroll(Course cartObj)
		{
			bool roleName = false;
			//try
			//{
				var Id = HttpContext.Session.GetInt32(SessionId);
				int Id1 = (int)Id;
				roleName = Repository.Enroll(Id1, cartObj.CourseId);

		/*}
			catch (Exception)
			{
				roleName = false;
			}*/
			return roleName;
		}
		[HttpPost]
		public JsonResult View(Course cartObj)
		{
			string roleName = "";
			try
			{
				HttpContext.Session.SetInt32(SessionView, cartObj.CourseId);
				roleName = "Valid Credentials";
			}
			catch (Exception)
			{
				roleName = "Invalid credentials";
			}
			return Json(roleName);
		}
		public JsonResult ValidateLearnerCredentials(User userObj)
		{
			string roleName = "";
			try
			{
				HttpContext.Session.SetInt32(SessionId, userObj.UserId);
				roleName = Repository.ValidateSLoginUsingLinq(userObj.Lname, userObj.Password);
			}
			catch (Exception)
			{
				roleName = "Invalid credentials";
			}

			return Json(roleName);
		}
		[HttpPost]
		public JsonResult ValidateTrainerCredentials(Trainer trainerObj)
		{
			string roleName = "";
			HttpContext.Session.SetInt32(SessionId, trainerObj.TrainerId);
			try
			{
				roleName = Repository.ValidateTLoginUsingLinq(trainerObj.TrainerId, trainerObj.Password);
			}
			catch (Exception)
			{
				roleName = "Invalid credentials";
			}

			return Json(roleName);
		}
		[HttpPost]
		public bool AddUser(Models.User UserObj)
		{
			bool status = false;
			try
			{
				Models.User showCommon = new Models.User();
				showCommon.Email = UserObj.Email;
				showCommon.Pname = UserObj.Pname;
				showCommon.Lname = UserObj.Lname;
				showCommon.Lage = UserObj.Lage;
				showCommon.Password = UserObj.Password;
				status = Repository.AddUser(showCommon.Email, showCommon.Pname, showCommon.Lname, showCommon.Lage, showCommon.Password);
			}
			catch (Exception ex)
			{
				status = false;
			}
			return status;
		}
		[HttpPost]
		public bool Addcourse(Models.Course UserObj)
		{
			bool status = false;
			var Id = HttpContext.Session.GetInt32(SessionId);
			try
			{
				Models.Course showCommon = new Models.Course();
				showCommon.TrainerId = (int)Id;
				showCommon.Cname = UserObj.Cname;
				showCommon.MinAge = UserObj.MinAge;
				showCommon.MaxAge = UserObj.MaxAge;
				showCommon.Cdur = UserObj.Cdur;
				showCommon.PreReq = UserObj.PreReq;
				showCommon.Cdesc = UserObj.Cdesc;
				showCommon.Approval = UserObj.Approval;
				status = Repository.AddCourse(showCommon.TrainerId, showCommon.Cname, showCommon.MinAge, showCommon.MaxAge, showCommon.Cdur, showCommon.PreReq, showCommon.Cdesc, showCommon.Approval);
			}
			catch (Exception ex)
			{
				status = false;
			}
			return status;
		}
		[HttpPost]
		public bool AddTrainer(Models.Trainer TrainerObj)
		{
			bool status = false;
			try
			{
				Models.Trainer showCommon = new Models.Trainer();
				showCommon.Email = TrainerObj.Email;
				showCommon.Tname = TrainerObj.Tname;
				showCommon.Cnum = TrainerObj.Cnum;
				showCommon.Password = TrainerObj.Password;
				status = Repository.AddTrainer(showCommon.Email, showCommon.Tname, showCommon.Cnum, showCommon.Password);
			}
			catch (Exception ex)
			{
				status = false;
			}
			return status;
		}
		[HttpDelete]
		public JsonResult DeleteCourse(Models.Course cartObj)
		{
			var status = false;
			try
			{
				status = Repository.DeleteCourse(cartObj.CourseId);
			}
			catch (Exception ex)
			{
				status = false;
			}
			return Json(status);
		}
	}
}
