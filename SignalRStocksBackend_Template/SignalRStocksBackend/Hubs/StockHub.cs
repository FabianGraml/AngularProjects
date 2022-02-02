using Microsoft.AspNetCore.SignalR;
using SignalRStocksBackend.DTOs;

namespace SignalRStocksBackend.Hubs
{
  public class StockHub : Hub
  {
    public int NrConnectedUsers { get; set; } = 0;

    public override Task OnConnectedAsync()
    {
      NrConnectedUsers++;
      NotifyConnectedUsers();
      return base.OnConnectedAsync();
    }
    public override Task OnDisconnectedAsync(Exception? exception)
    {
      NrConnectedUsers--;
      NotifyConnectedUsers();
      return base.OnDisconnectedAsync(exception);
    }
    public void BuyStock(TransactionDto transactionDto)
    {
      Clients.All.SendAsync("transaction", transactionDto);
    }
    public void NotifyConnectedUsers()
    {
      Clients.All.SendAsync("connectedUsers", NrConnectedUsers);
    }
    public void Login(ConnectedUsers connectedUsers)
    {
      Console.WriteLine(connectedUsers.Username);
      connectedUsers = new ConnectedUsers
      {
        AmountOfUsers = NrConnectedUsers,
        Username = connectedUsers.Username,
      };
      NotifyConnectedUsers();
      Clients.All.SendAsync("login", connectedUsers);
    }
    public void Disconnect(ConnectedUsers connectedUsers)
    {
      NotifyConnectedUsers();
      Clients.All.SendAsync("disconnect", connectedUsers);
    }
  }
}
