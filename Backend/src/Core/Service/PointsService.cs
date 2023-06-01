using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Models;
using Core.Repository;

namespace Core.Service
{
    public class PointsService : IPointsService
    {
        private readonly IPointsRepository _repository;

        public PointsService(IPointsRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<Point>> GetPoints()
        {
            return await _repository.GetPoints();
        }

        public async Task RemovePoint(int pointId)
        {
            await _repository.RemovePoint(pointId);
        }

        public async Task UpdatePointPosition(int pointId, float x, float y)
        {
            Point point = await _repository.GetPointById(pointId);
            point.X = x;
            point.Y = y;

            await _repository.UpdatePoint(point);
        }
    }
}