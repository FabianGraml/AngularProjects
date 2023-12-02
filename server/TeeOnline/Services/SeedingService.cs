using TeeOnline.CSV;

namespace TeeOnline.Services
{
    public class SeedingService
    {
        private readonly TeeOnlineContext db;
        private readonly CSVReader reader = new CSVReader();

        public SeedingService(TeeOnlineContext db)
        {
          this.db = db;
        }
        public void Seed()
        {
            if (db.Players.Count() == 0)
            {
                var players = reader.ReadPlayers();
                foreach (var player in players)
                {
                    db.Players.Add(player);
                    db.SaveChanges();
                }
                Console.WriteLine($"SeedingService::Loading Players into db");
            }
            else
            {
                Console.WriteLine($"SeedingService::Players in db: {db.Players.Count()}");
            }
        }
    }
}
