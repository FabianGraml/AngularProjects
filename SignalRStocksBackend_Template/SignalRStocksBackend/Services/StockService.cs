using SignalRStocksBackend.DTOs;
using SignalRStocksBackend.Entities;
using SignalRStocksBackend.Hubs;

namespace SignalRStocksBackend.Services;

public class StockService
{
    private readonly StockContext db;
    private readonly StockHub stockHub;

    public StockService(StockContext db, StockHub stockHub)
    {
        this.db = db;
        this.stockHub = stockHub;
    }
    public void GetUsers()
    {
        //stockHub.
    }

}
