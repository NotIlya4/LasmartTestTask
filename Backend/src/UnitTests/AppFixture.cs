using Core.EntityFramework;
using Microsoft.AspNetCore.Mvc.Testing;
using Startup;
using Xunit;

namespace UnitTests
{
    [CollectionDefinition(nameof(AppFixture))]
    public class AppFixture : ICollectionFixture<AppFixture>
    {
        public WebApplicationFactory<Program> Factory { get; }
        public PointsClient Client { get; }
        public SamplePoints SamplePoints { get; } = new SamplePoints();

        public AppFixture()
        {
            Factory = new WebApplicationFactory<Program>();
            Client = new PointsClient(Factory.CreateClient());
        }
    }
}