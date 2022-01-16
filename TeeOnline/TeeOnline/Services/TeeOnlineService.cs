using TeeOnline.CSV;
using TeeOnline.DTOs;
using TeeOnline.Exceptions;

namespace TeeOnline.Services;

public class TeeOnlineService
{
    private readonly TeeOnlineContext db;

    public TeeOnlineService(TeeOnlineContext db)
    {
        this.db = db;
    }

    public PlayerDTO Login(PlayerLoginDTO playerLoginDTO)
    {
        var player = db.Players
            .Where(x => x.Email == playerLoginDTO.Email && x.Password == playerLoginDTO.Password)
            .FirstOrDefault();

        if (player != null)
        {
            var playerDTO = new PlayerDTO()
            {
                PlayerId = (int)player!.PlayerId,
                FirstName = player!.FirstName,
                LastName = player.LastName,
                Handicap = player.Handicap,
                GolfClubId = (int)player!.HomeGolfClubGolfClubId!,

            };
            return playerDTO;
        }
        else
        {
            return new PlayerDTO { PlayerId = -1 };
        }
    }
    public List<GolfClubDTO> GetGolfClubs()
    {
        var golfClubs = db.GolfClubs.ToList();
        var list = new List<GolfClubDTO>();
        foreach (var golf in golfClubs)
        {
            var golfClubDTO = new GolfClubDTO
            {
                GolfClubId = golf.GolfClubId,
                Name = golf.Name,
            };
            list.Add(golfClubDTO);
        }
        return list;
    }
    public List<PlayerDTO> GetPlayers()
    {
        var players = db.Players.Include(x => x.Bookings).Include(x => x.HomeGolfClubGolfClub).ToList();
        var list = new List<PlayerDTO>();
        foreach (var player in players)
        {
            list.Add(new PlayerDTO
            {
                PlayerId = (int)player!.PlayerId,
                FirstName = player!.FirstName,
                LastName = player.LastName,
                Handicap = player.Handicap,
                GolfClubId = (int)player!.HomeGolfClubGolfClubId!,
                GolfClubName = player!.HomeGolfClubGolfClub!.Name,
            });
        }
        return list;
    }
public BookinRequestDTO AddBooking(BookinRequestDTO bookingRequestDTO)
{
    var date = $"{bookingRequestDTO.Date!} {bookingRequestDTO.Hour}:{bookingRequestDTO.Minute}";
    var players = new List<Player>();
    foreach (var number in bookingRequestDTO!.PlayerIds!)
    {
        var player = db.Players.FirstOrDefault(x => x.PlayerId == number);

        if (player != null)
        {
            players.Add(player!);
        }
        else
        {
            throw new NoPlayerException("Cannot find player with id");
        }
    }
    var booking = new Booking
    {
        GolfClubId = bookingRequestDTO.GolfClubId,
        Players = players,
        DateTime = date,
        IsLocked = bookingRequestDTO.IsLocked == true ? 4 : bookingRequestDTO.PlayerIds.Count(),
    };

    var existingBooking = db.Bookings.Include(x => x.Players).FirstOrDefault(x => x.GolfClubId == bookingRequestDTO.GolfClubId && x.DateTime == date);

    if (existingBooking != null)
    {
        var bookingInDb = db.Bookings.Single(x => x.GolfClubId == bookingRequestDTO.GolfClubId && x.DateTime == date);
        UpdateBooking(bookingInDb, players);
    }
    if (existingBooking == null)
    {
        db.Bookings.Add(booking);
        db.SaveChanges();
    }
    return bookingRequestDTO;
}
private void UpdateBooking(Booking bookingInDb, List<Player> players)
{
    if (bookingInDb.Players.Count() <= 4 && (players.Count() + bookingInDb.Players.Count()) <= 4)
    {
        players.ForEach(x => bookingInDb.Players.Add(x));
        bookingInDb.IsLocked = bookingInDb.Players.Count();
        db.SaveChanges();
    }
    else
    {
        throw new TooMuchPlayersException();
    }
}
public BookingReplyDTO GetBooking(int golfClubId, string date, int hour, int minute)
{
    var booking = db.Bookings.Include(x => x.Players).Include(x => x.GolfClub).Where(x => x.DateTime == $"{date} {hour}:{minute}" && x.GolfClubId == golfClubId).FirstOrDefault();
    if (booking == null)
    {
        return new BookingReplyDTO()
        {
            BookingId = -1,
            GolfClubName = null,
            DateTime = null,
            GolfClubId = -1,
            IsLocked = 0,
            PlayerIds = null,
            PlayerNames = null
        };
    }
    else
    {
        return new BookingReplyDTO
        {
            DateTime = booking.DateTime,
            GolfClubName = booking!.GolfClub!.Name,
            IsLocked = booking.IsLocked,
            PlayerIds = booking.Players.Select(x => x.PlayerId).ToList(),
            PlayerNames = booking.Players.Select(x => $"{x.FirstName} {x.LastName}").ToList(),
            BookingId = booking.BookingId,
            GolfClubId = booking.GolfClubId
        };
    }
}

}

