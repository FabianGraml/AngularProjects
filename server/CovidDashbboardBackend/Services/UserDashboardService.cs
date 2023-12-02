using CovidDashbboardBackend.CSV;
using CovidDashbboardBackend.DTOs;
using CovidDashbboardBackend.DTOs.UserControllerDTOs;
using CovidDashbboardBackend.Models;

namespace CovidDashbboardBackend.Services
{
    public class UserDashboardService
    {
        private readonly CSVReader reader = new CSVReader();

        public ICollection<CovidCasesDTO> GetCases()
        {
            var list = new List<CovidCasesDTO>();

           reader.ReadCovidCases().ForEach(x =>
           {
               list.Add(new CovidCasesDTO
               {
                   Country = x.Country,
                   NewCases = x.NewCases,
                   Date = x.Date,
               });
           });
            
            return list.Where(x => x.Country == "Österreich").ToList();
        }
        public ICollection<CovidDeathsDTO> GetDeaths()
        {
            var list = new List<CovidDeathsDTO>();

            reader.ReadCovidCases().ForEach(x =>
            {
                list.Add(new CovidDeathsDTO
                {
                    Country = x.Country,
                    Deaths = x.Deaths,
                    Date = x.Date,
                });
            });

            return list.Where(x => x.Country == "Österreich").ToList();
        }
        public CovidGenderCasesDTO GetGenderCases()
        {
            var list = reader.ReadCovidCasesAgeGroup();
            var lastDate = list.Last().Date;
            var femaleCases = list.Where(x => x.Gender == "W" && x.FederalState == "Österreich" && x.Date == lastDate).ToList();
            var maleCases = list.Where(x => x.Gender == "M" && x.FederalState == "Österreich" && x.Date == lastDate).ToList();
            return new CovidGenderCasesDTO()
            {
                FemaleCases = femaleCases.Sum(x => x.NumberOfCases),
                MaleCases = maleCases.Sum(x => x.NumberOfCases),
            };
        }
        public List<CovidAllTimeIntensiveCareDTO> GetIntensiveCareAllTime()
        {
            var list = new List<CovidAllTimeIntensiveCareDTO>();
            reader.ReadHospitalizations().ForEach(x =>
            {
                list.Add(new CovidAllTimeIntensiveCareDTO
                {
                    Country = x.FederalState,
                    Date = x.Date,
                    IntensiveCareNumber = x.IntensiveCareBedCovid,
                });
            });
            return list.Where(x => x.Country == "Österreich").ToList();
        }
        public CovidIntensiveCareDTO GetIntensiveCare()
        {
            var list = new List<CovidIntensiveCareDTO>();

            reader.ReadHospitalizations().ForEach(x =>
            {
                list.Add(new CovidIntensiveCareDTO
                {
                    IntensiveCareBedCov = x.IntensiveCareBedCovid,
                    IntensiveCareBedFree = x.IntensiveCareBedFree,
                    IntensiveCareBedNonCov = x.IntensiveCareBedNonCovid,
                });
            });
            return list.Last();
        }
        public CovidCasesGKZ GetCovidCasesGKZ()
        {
            return reader.ReadCovidCasesGKZ().Where(x => x.District == "Grieskirchen").First();
        }
    }
}
