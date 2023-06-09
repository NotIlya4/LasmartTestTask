using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Startup.Extensions;
using Startup.Middlewares;

namespace Startup
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddRepository();
            services.AddService();
            services.AddConfiguredDb();
            services.AddConfiguredCors();
            
            services.AddControllers();
            services.AddSwaggerGen();
        }
        
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.ConfigureDb().GetAwaiter().GetResult();
            
            app.UseMiddleware<ExceptionCatcherMiddleware>();
            app.UseCors();
            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Lasmart Test Task"));
            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
