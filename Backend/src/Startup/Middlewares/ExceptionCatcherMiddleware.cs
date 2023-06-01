using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Startup.Middlewares
{
    public class ExceptionCatcherMiddleware : IMiddleware
    {
        private readonly ILogger<ExceptionCatcherMiddleware> _logger;

        public ExceptionCatcherMiddleware(ILogger<ExceptionCatcherMiddleware> logger)
        {
            _logger = logger;
        }
        
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next(context);
            }
            catch (Exception e)
            {
                _logger.LogWarning(e, "Exception caught in ExceptionCatcherMiddleware during execution");

                object responseDto = new
                {
                    Title = "Internal Exception",
                    Detail = e.Message
                };
                
                ActionContext actionContext = new();
                actionContext.HttpContext = context;

                ObjectResult objectResult = new(responseDto);
                objectResult.StatusCode = 500;
                await objectResult.ExecuteResultAsync(actionContext);
            }
        }
    }
}