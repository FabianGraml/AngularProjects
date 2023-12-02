namespace CovidDashbboardBackend.Models
{
    public class UserAuthInfo
    {
        public int Id { get; set; }
        public string? Email { get; set; }
        public string? Role { get; set; }
        public bool IsAdmin => Role == "Admin";
    }
}
