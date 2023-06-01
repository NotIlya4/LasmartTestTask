using System.Collections.Generic;
using System.Threading.Tasks;
using Core.EntityFramework;
using Core.Models;
using Microsoft.EntityFrameworkCore;

namespace Core.Repository
{
    public class PointsRepository : IPointsRepository
    {
        private readonly AppDbContext _dbContext;

        public PointsRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Point>> GetPoints()
        {
            return await _dbContext.Points
                .Include(p => p.Comments)
                .ToListAsync();
        }

        public async Task<Point> GetPointById(int pointId)
        {
            return await _dbContext.Points
                .Include(p => p.Comments)
                .FirstAsync(p => p.Id == pointId);
        }

        public async Task RemovePoint(int pointId)
        {
            Point? point = await _dbContext.Points.FirstOrDefaultAsync(p => p.Id == pointId);
            _dbContext.Points.Remove(point);

            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdatePoint(Point point)
        {
            _dbContext.Update(point);
            await _dbContext.SaveChangesAsync();
        }

        public async Task AddPoint(Point point)
        {
            await _dbContext.AddAsync(point);
            await _dbContext.SaveChangesAsync();
        }
    }
}