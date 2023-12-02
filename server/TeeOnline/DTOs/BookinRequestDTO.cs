using System.ComponentModel.DataAnnotations;

namespace TeeOnline.DTOs
{
    public class BookinRequestDTO
    {
        public string? Date { get; set; }
        public int Hour { get; set; }
        public int Minute { get; set; }
        public bool IsLocked { get; set; }
        public int GolfClubId { get; set; }
        [MaxLength(4)]
        public int[]? PlayerIds { get; set; }
    }
}
