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
    public void BuyShare(TransactionDto transactionDto)
    {
      Console.WriteLine("StockHub::BuyShare");
      Clients.All.SendAsync("transactionReceived", transactionDto);
    }
    public void SellShare(TransactionDto transactionDto)
    {
      Clients.All.SendAsync("transactionReceived2", transactionDto);
      Console.WriteLine("StockHub::SellShare");
    }
    public void ShowMsg(string message)
    {
      Console.WriteLine("StockHub::ShowMsg");
      Clients.All.SendAsync("showMsg", message);
    }
  }
}
