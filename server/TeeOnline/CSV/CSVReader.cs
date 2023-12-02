namespace TeeOnline.CSV
{
    public class CSVReader
    {
        public CSVReader()
        {

        }
        public List<Player> ReadPlayers()
        {
            return File.ReadAllLines("./CSV/Players.csv")
                .Skip(1)
                .Select(x => x.Split(";"))
                .Select(x => new Player
                {
                    FirstName = x[0],
                    LastName = x[1],
                    Handicap = double.Parse(x[2].Replace(",", ".")),
                    HomeGolfClubGolfClubId = long.Parse(x[3]),
                    Email = $"{x[0].ToLower()}.{x[1].ToLower()}@sus.htl-grieskirchen.at",
                    Password = "12345",
                })
                .ToList();
        }
    }
}
