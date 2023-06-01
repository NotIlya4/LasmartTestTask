using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Models;

namespace Core.Service
{
    public interface IPointsService
    {
        Task<List<Point>> GetPoints();
        Task RemovePoint(int pointId);
        Task UpdatePointPosition(int pointId, float x, float y);
    }
}