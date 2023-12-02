namespace CovidDashbboardBackend.DTOs.UserControllerDTOs
{
    public class CovidIntensiveCareDTO
    {
        public int IntensiveCareBedFree { get; set; }
        public int IntensiveCareBedCov { get; set; }
        public int IntensiveCareBedNonCov { get; set; }
    }
}
