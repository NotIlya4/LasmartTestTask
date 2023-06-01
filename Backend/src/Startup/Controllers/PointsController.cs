using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Models;
using Core.Repository;
using Core.Service;
using Microsoft.AspNetCore.Mvc;

namespace Startup.Controllers
{
    [ApiController]
    [ProducesResponseType(500)]
    [Route("api/points")]
    public class PointsController : ControllerBase
    {
        private readonly IPointsRepository _repository;
        private readonly IPointsService _pointsService;

        public PointsController(IPointsRepository repository, IPointsService pointsService)
        {
            _repository = repository;
            _pointsService = pointsService;
        }

        [HttpGet]
        [ProducesResponseType(200)]
        public async Task<ActionResult<List<Point>>> GetPoints()
        {
            List<Point> points = await _repository.GetPoints();
            return Ok(points);
        }

        [HttpDelete]
        [Route("id/{id}")]
        [ProducesResponseType(204)]
        public async Task<ActionResult> RemovePoint(int id)
        {
            await _repository.RemovePoint(id);
            return NoContent();
        }

        [HttpPost]
        [ProducesResponseType(204)]
        public async Task<ActionResult> AddPoint([FromBody] Point point)
        {
            await _repository.AddPoint(point);
            return NoContent();
        }

        [HttpPost]
        [ProducesResponseType(204)]
        [Route("position")]
        public async Task<ActionResult> UpdatePointPosition([FromBody] UpdatePointPositionRequest request)
        {
            await _pointsService.UpdatePointPosition(request.PointId, request.X, request.Y);
            return NoContent();
        }
    }
}