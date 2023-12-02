namespace TeeOnline.DTOs
{
    public class PlayerDTO
    {
        public int PlayerId { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public double Handicap { get; set; }
        public int GolfClubId { get; set; }
        public string? GolfClubName { get; set; }
    }
}
