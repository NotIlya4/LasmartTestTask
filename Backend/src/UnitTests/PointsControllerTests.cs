using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.EntityFramework;
using Core.Models;
using Startup.Controllers;
using Xunit;

namespace UnitTests
{
    [Collection(nameof(AppFixture))]
    public class PointsControllerTests
    {
        private readonly PointsClient _client;
        private readonly SamplePoints _samplePoints;
        
        public PointsControllerTests(AppFixture fixture)
        {
            _client = fixture.Client;
            _samplePoints = fixture.SamplePoints;
        }
        
        [Fact]
        public async Task GetPoints_AppHasSeededPoints_ThoseSeededPoints()
        {
           List<Point> result = await _client.GetPoints();

           Assert.True(_samplePoints.Points.SequenceEqual(result));
        }

        [Fact]
        public async Task RemovePoint_RemoveOneOfSeededPoint_PointRemoved()
        {
            await _client.RemovePoint(1);
            List<Point> result = await _client.GetPoints();
            List<Point> expect = _samplePoints.Points.Where(p => p.Id != 1).ToList();
            
            Assert.True(expect.SequenceEqual(result));

            await _client.AddPoint(_samplePoints.Points[0]);
        }

        [Fact]
        public async Task UpdatePointPosition_UpdatePositionOfOneSeededPoint_PositionUpdated()
        {
            await _client.UpdatePointPosition(new UpdatePointPositionRequest(1, 1, 2));
            Point result = (await _client.GetPoints())[0];
            
            Assert.Equal(1, result.X);
            Assert.Equal(2, result.Y);

            await _client.UpdatePointPosition(new UpdatePointPositionRequest(1, _samplePoints.Points[0].X, _samplePoints.Points[0].Y));
        }
    }
}