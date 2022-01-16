using System.Collections;

namespace TeeOnline.DTOs
{
    public class BookingReplyDTO
    {
        public long? GolfClubId { get; set; }
        public string? GolfClubName { get; set; }
        public ICollection? PlayerNames { get; set; }
        public ICollection? PlayerIds { get; set; }
        public string? DateTime { get; set; }
        public long BookingId { get; set; }
        public long IsLocked { get; set; }
    }
}
