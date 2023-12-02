namespace CovidDashbboardBackend.Models
{
    public class CovidCasesAgeGroup
    {
        public string? Date { get; set; }
        public int AgeGroupId { get; set; }
        public string? AgeGroup { get; set; }
        public string? FederalState { get; set; }
        public int FederalStateId { get; set; }
        public int? Population { get; set; }
        public string? Gender { get; set; }
        public int NumberOfCases { get; set; }
        public int NumberOfRecovered { get; set; }
        public int NumberOfDeaths { get; set; }
    }
}
