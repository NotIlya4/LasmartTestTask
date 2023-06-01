using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Models;
using Core.Repository;

namespace Core.EntityFramework
{
    public class DbSeeder
    {
        private readonly IPointsRepository _repository;

        public DbSeeder(IPointsRepository repository)
        {
            _repository = repository;
        }

        public async Task Seed(List<Point> points)
        {
            foreach (var point in points)
            {
                try
                {
                    await _repository.GetPointById(point.Id);
                }
                catch (Exception)
                {
                    await _repository.AddPoint(point);
                }
            }
        }
    }
}