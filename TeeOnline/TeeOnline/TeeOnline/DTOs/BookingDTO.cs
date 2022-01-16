namespace TeeOnline.DTOs
{
    public class BookingDTO
    {
        public long BookingId { get; set; }
        public string DateTime { get; set; } = null!;
        public long IsLocked { get; set; }
        public long? GolfClubId { get; set; }
    }
}
