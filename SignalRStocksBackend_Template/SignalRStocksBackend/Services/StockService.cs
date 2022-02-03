using SignalRStocksBackend.DTOs;
using SignalRStocksBackend.Entities;
using SignalRStocksBackend.Hubs;

namespace SignalRStocksBackend.Services;

public class StockService
{
  private readonly StockContext db;

  public StockService(StockContext db)
  {
    this.db = db;
  }
  public UserDto Login(string username)
  {
    var user = db.Users.FirstOrDefault(x => x.Name == username);
    if (user != null)
    {
      return new UserDto {
        Cash = user.Cash,
        Id = user.Id,
        Name = user.Name,
        Depots = db.UserShares.Where(x => x.User!.Id == user.Id).Select(x => new DepotDto
        {
          Amount = x.Amount,
          ShareName = x.Share!.Name,
        }).ToList(),
      };
    } else
    {
      return new UserDto
      {
        Cash = -1,
        Id = -1,
        Name = null!,
        Depots = null!,
      };
    }
  }

}
