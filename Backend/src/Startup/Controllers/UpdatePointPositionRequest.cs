namespace Startup.Controllers
{
    public class UpdatePointPositionRequest
    {
        public int PointId { get; set; }
        public float X { get; set; }
        public float Y { get; set; }

        public UpdatePointPositionRequest(int pointId, float x, float y)
        {
            PointId = pointId;
            X = x;
            Y = y;
        }

        public UpdatePointPositionRequest()
        {
            
        }
    }
}