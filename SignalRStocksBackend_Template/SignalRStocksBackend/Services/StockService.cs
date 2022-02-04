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
    if (user == null)
    {
      return new UserDto
      {
        Cash = -1,
        Id = -1,
        Name = null!,
        Depots = null!,
      };
    }
    return new UserDto
    {
      Cash = user.Cash,
      Id = user.Id,
      Name = user.Name,
      Depots = db.UserShares.Where(x => x.User!.Id == user.Id).Select(x => new DepotDto
      {
        Amount = x.Amount,
        ShareName = x.Share!.Name,
      }).ToList(),
    };

  }

  public ICollection<ShareDto> GetStocks()
  {
    return db.Shares.Select(x => new ShareDto().CopyPropertiesFrom(x)).ToList();
  }

  public TransactionDto Buy(TransactionDto transactionDto)
  {
    var share = db.Shares.FirstOrDefault(x => x.Name == transactionDto.ShareName);

    //check if the enough shares are available in the Database
    if (transactionDto.Amount > share!.UnitsInStock)
    {
      return new TransactionDto();
    }

    //Edit Database entries
    var shareDatabase = db.Shares.Where(x => x.Id == share!.Id).Single();
    shareDatabase.UnitsInStock = shareDatabase.UnitsInStock - transactionDto.Amount;
    var userDatabase = db.Users.Where(x => x.Name == transactionDto.Username).Single();
    userDatabase.Cash = userDatabase.Cash - share!.StartPrice * transactionDto.Amount;
    db.UserShares.Add(new UserShare
    {
      Amount = transactionDto.Amount,
      Share = db.Shares.Where(x => x.Name == transactionDto.ShareName).First(),
      User = db.Users.Where(x => x.Name == transactionDto.Username).First(),
    });
    db.SaveChanges();

    //return TransactionDto with calculated values
    return new TransactionDto
    {
      Amount = transactionDto.Amount,
      IsUserBuy = transactionDto.IsUserBuy,
      Price = share!.StartPrice * transactionDto.Amount,
      ShareName = transactionDto.ShareName,
      UnitsInStockNow = share.UnitsInStock - transactionDto.UnitsInStockNow,
      Username = transactionDto.Username,
    };


  }
}
