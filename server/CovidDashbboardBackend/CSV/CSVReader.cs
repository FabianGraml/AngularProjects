using CovidDashbboardBackend.DTOs;
using CovidDashbboardBackend.Models;

namespace CovidDashbboardBackend.CSV
{
    public class CSVReader
    {
        public CSVReader() { }

        public List<CovidCasesTimeline> ReadCovidCases()
        {
            var lines = File.ReadAllLines("./CSV/CovidFaelle_Timeline.csv").Skip(1);

            var cases = new List<CovidCasesTimeline>();
            foreach (var line in lines)
            {
                var split = line.Split(";");

                cases.Add(new CovidCasesTimeline
                {
                    Date = split[0],
                    Country = split[1],
                    NewCases = split[4],
                    Deaths = split[8],
                });
            }
            return cases;

        }
        public List<Hospitalizations> ReadHospitalizations()
        {
            var lines = File.ReadAllLines("./CSV/Hospitalisierung.csv").Skip(1);

            var hospitalizations = new List<Hospitalizations>();
            foreach (var line in lines)
            {
                var split = line.Split(";");
                hospitalizations.Add(new Hospitalizations
                {
                    Date = split[0],
                    FederalStateId = int.Parse(split[1]),
                    FederalState = split[2],
                    NormalBedsCovid = int.Parse(split[3]),
                    IntensiveCareBedCapacity = int.Parse(split[4]),
                    IntensiveCareBedCovid = int.Parse(split[5]),
                    IntensiveCareBedNonCovid = int.Parse(split[6]),
                    IntensiveCareBedFree = int.Parse(split[7]),
                });
            }
            return hospitalizations;

        }
        public List<CovidCasesAgeGroup> ReadCovidCasesAgeGroup()
        {
            var lines = File.ReadAllLines("./CSV/CovidFaelle_Altersgruppe.csv").Skip(1);

            var casesAgeGroups = new List<CovidCasesAgeGroup>();
            foreach (var line in lines)
            {
                var split = line.Split(";");

                casesAgeGroups.Add(new CovidCasesAgeGroup
                {
                    Date = split[0],
                    AgeGroupId = int.Parse(split[1]),
                    AgeGroup = split[2],
                    FederalState = split[3],
                    FederalStateId = int.Parse(split[4]),
                    Population = int.Parse(split[5]),
                    Gender = split[6],
                    NumberOfCases = int.Parse(split[7]),
                    NumberOfRecovered = int.Parse(split[8]),
                    NumberOfDeaths = int.Parse(split[9]),
                });
            }
            return casesAgeGroups;
        }
        public List<CovidDeltaCases> ReadCovidCasesDelta()
        {
            var lines = File.ReadAllLines("./CSV/CovidFaelleDelta.csv").Skip(1);

            var casesDelta = new List<CovidDeltaCases>();
            foreach (var line in lines)
            {
                var split = line.Split(";");
             
                casesDelta.Add(new CovidDeltaCases
                {
                    Date = split[0],
                    NumberOfDeltaPreviousDay = split[1],
                    NumberOfDeltaRecoveredPreviousDay = split[2],
                    NumberOfDeltaDeathPreviousDay = split[3],
                    NumberOfDeltaActivePreviousDay = split[4],
                    TotalNumberOfDeltaPreviousDay = split[5]

                }); ;
            }
            return casesDelta;
        }
        public List<CovidCasesGKZ> ReadCovidCasesGKZ()
        {
            var lines = File.ReadAllLines("./CSV/CovidFaelle_GKZ.csv").Skip(1);

            var casesGKZ = new List<CovidCasesGKZ>();
            foreach (var line in lines)
            {
                var split = line.Split(";");

                casesGKZ.Add(new CovidCasesGKZ
                {
                    District = split[0],
                    GKZ = int.Parse(split[1]),
                    Population = int.Parse(split[2]),
                    Cases = int.Parse(split[3]),
                    DeathCases = int.Parse(split[4]),
                    Cases7Days = int.Parse(split[5])

                }); ;
            }
            return casesGKZ;
        }
    }
}
