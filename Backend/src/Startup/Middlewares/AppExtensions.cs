using System.Threading.Tasks;
using Core.EntityFramework;
using Core.Repository;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace Startup.Middlewares
{
    public static class AppExtensions
    {
        public static async Task ConfigureDb(this IApplicationBuilder app)
        {
            var scope = app.ApplicationServices.CreateScope();
            var repository = scope.ServiceProvider.GetRequiredService<IPointsRepository>();
            var seeder = new DbSeeder(repository);
            await seeder.Seed(new SamplePoints().Points);
            scope.Dispose();
        }
    }
}