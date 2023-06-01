using System;
using System.Collections.Generic;
using System.Linq;

namespace Core.Models
{
    public class Point
    {
        public override bool Equals(object? obj)
        {
            if (obj is Point other)
            {
                return this == other;
            }

            return false;
        }

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
        
        public virtual bool Equals(Point? other)
        {
            if (other is null)
            {
                return false;
            }

            return this == other;
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Id, X, Y, Radius, Color, Comments);
        }
        
        public static bool operator ==(Point? x, Point? y)
        {
            if (x is null || y is null)
            {
                return false;
            }
            
            return x.Id == y.Id && x.X.Equals(y.X) && x.Y.Equals(y.Y) && x.Radius.Equals(y.Radius) &&
                   x.Color.Equals(y.Color) && x.Comments.OrderBy(c => c.Id).SequenceEqual(y.Comments.OrderBy(c => c.Id));
        }

        public static bool operator !=(Point? x, Point? y)
        {
            return !(x == y);
        }
    }
}