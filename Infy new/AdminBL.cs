using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Infy_new
{
	public class AdminBL
	{
		IKFRepository repository;
		public AdminBL()
		{
			repository = new IKFRepository();
		}
	}
}
