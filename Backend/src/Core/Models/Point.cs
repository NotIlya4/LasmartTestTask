using System.Collections.Generic;

namespace Core.Models
{
    public class Point
    {
        public int Id { get; set; }
        public float X { get; set; }
        public float Y { get; set; }
        public float Radius { get; set; }
        public string Color { get; set; }
        public IEnumerable<Comment> Comments { get; set; }

        public Point(int id, float x, float y, float radius, string color, IEnumerable<Comment> comments)
        {
            Id = id;
            X = x;
            Y = y;
            Radius = radius;
            Color = color;
            Comments = comments;
        }

        private Point()
        {
            
        }
    }
}