namespace CovidDashbboardBackend.Models
{
    public class Hospitalizations
    {
        public string? Date { get; set; }
        public int FederalStateId { get; set; }
        public string? FederalState { get; set; }
        public int NormalBedsCovid { get; set; }
        public int IntensiveCareBedCapacity { get; set; }
        public int IntensiveCareBedCovid { get; set; }
        public int IntensiveCareBedNonCovid { get; set; }
        public int IntensiveCareBedFree { get; set; }
    }
}
