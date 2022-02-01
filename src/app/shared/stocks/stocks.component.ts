import { Component, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ITransactionDTO } from 'src/app/models/transactionDTO';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss']
})
export class StocksComponent implements OnInit {

  private hubConnection!: HubConnection;
  transactions: ITransactionDTO[] = [];
  messages: string[] = [];
  ngOnInit() {
    this.hubConnection = new HubConnectionBuilder()
    .withUrl('http://localhost:5174/transaction')
    .build();

    this.hubConnection.on('transaction', (transaction: ITransactionDTO) => {
      this.transactions.push(transaction)
    });
    this.hubConnection.on('login', (name: 'hans') => {
    });

    this.hubConnection.start().then(() => console.log('*** connection established'))
    .catch(err => console.log('*** connection error: ' + err));  
  }

}
