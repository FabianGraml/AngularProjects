using Microsoft.AspNetCore.SignalR;
using SignalRStocksBackend.DTOs;
using SignalRStocksBackend.Entities;
using SignalRStocksBackend.Services;

namespace SignalRStocksBackend.Hubs
{
  public class StockHub : Hub
  {
    public int NrConnectedUsers { get; set; } = 0;
    private readonly StockService stockService;
    public StockHub(StockService stockService)
    {
      this.stockService = stockService;
    }
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
    public void Login(string userName)
    {
      NotifyConnectedUsers();
      Clients.All.SendAsync("login", stockService.Login(userName));
    }
    public void Disconnect()
    {
      NotifyConnectedUsers();
      Clients.All.SendAsync("disconnect");
    }
  }
}
