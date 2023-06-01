namespace Core.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public string BackgroundColor { get; set; }

        public Comment(int id, string text, string backgroundColor)
        {
            Id = id;
            Text = text;
            BackgroundColor = backgroundColor;
        }

        private Comment()
        {
            
        }
    }
}