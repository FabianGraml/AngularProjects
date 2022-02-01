using Microsoft.AspNetCore.SignalR;
using SignalRStocksBackend.DTOs;

namespace SignalRStocksBackend.Hubs
{
    public class StockHub : Hub
    {
        public int ConnectedUsers { get; set; }
        
        public override Task OnConnectedAsync()
        {
            ConnectedUsers++;
            return base.OnConnectedAsync();
        }
        public override Task OnDisconnectedAsync(Exception? exception)
        {
            ConnectedUsers--;
            return base.OnDisconnectedAsync(exception);
        }
        public void BuyStock(TransactionDto transactionDto)
        {
            Clients.All.SendAsync("transaction", transactionDto);
        }
        //Notify every subscriber if a new user logged in. Sends the Subscriber the name of the logged in user
        public void Login(string name)
        {
            Clients.All.SendAsync("login", name);
        }
    }
}
