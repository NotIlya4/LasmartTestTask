using System.Collections.Generic;
using Core.Models;

namespace Core.EntityFramework
{
    public class SamplePoints
    {
        public List<Point> Points { get; }

        public SamplePoints()
        {
            Points = new List<Point>()
            {
                new Point(
                    id: 1,
                    x: 100,
                    y: 200,
                    radius: 50,
                    color: "orange",
                    comments: new[]
                    {
                        new Comment(
                            id: 1,
                            text: "Comment 1",
                            backgroundColor: "white"),
                        new Comment(
                            id: 2,
                            text: "Comment 2",
                            backgroundColor: "white"),
                        new Comment(
                            id: 3,
                            text: "Comment 3",
                            backgroundColor: "white"),
                        new Comment(
                            id: 4,
                            text: "Comment 4 Comment 4 Comment 4 Comment 4",
                            backgroundColor: "yellow"),
                        new Comment(
                            id: 5,
                            text: "Comment 5",
                            backgroundColor: "white"),
                    }),
                new Point(
                    id: 2,
                    x: 400,
                    y: 700,
                    radius: 100,
                    color: "blue",
                    comments: new[]
                    {
                        new Comment(
                            id: 6,
                            text: "Comment 1",
                            backgroundColor: "pink"),
                        new Comment(
                            id: 7,
                            text: "Comment 2",
                            backgroundColor: "white"),
                    })
            };
        }
    }
}