using Microsoft.AspNetCore.Mvc.Filters;
using System.Security.Claims;

namespace WebApplication1.Filter
{
	public class LogFilter : IAsyncActionFilter
	{
		public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
		{
			//Befor Excute
			var userId = context.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
			var actionName = context.ActionDescriptor.DisplayName;
			//save in database 
			await next();

			//After Excuted 

		//	throw new NotImplementedException();
		}
		
	}
}
