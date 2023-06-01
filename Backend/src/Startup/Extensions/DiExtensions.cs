using Core.EntityFramework;
using Core.Repository;
using Core.Service;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Startup.Middlewares;

namespace Startup.Extensions
{
    public static class DiExtensions
    {
        public static void AddConfiguredDb(this IServiceCollection services)
        {
            services.AddDbContext<AppDbContext>(builder =>
            {
                builder.UseInMemoryDatabase("Database");
            });
        }

        public static void AddRepository(this IServiceCollection services)
        {
            services.AddScoped<IPointsRepository, PointsRepository>();
        }

        public static void AddService(this IServiceCollection services)
        {
            services.AddScoped<IPointsService, PointsService>();
            services.AddScoped<ExceptionCatcherMiddleware>();
        }
    }
}