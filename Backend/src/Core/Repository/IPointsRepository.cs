using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Models;

namespace Core.Repository
{
    public interface IPointsRepository
    {
        Task<List<Point>> GetPoints();
        Task<Point> GetPointById(int pointId);
        Task RemovePoint(int pointId);
        Task UpdatePoint(Point point);
        Task AddPoint(Point point);
    }
}