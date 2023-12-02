namespace CovidDashbboardBackend.Models
{
    public class CovidCasesGKZ
    {
        public string? District { get; set; }
        public int GKZ { get; set; }
        public int Population { get; set; }
        public int Cases { get; set; }
        public int DeathCases { get; set; }
        public int Cases7Days { get; set; }
    }
}
