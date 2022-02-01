import { Component, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ITransactionDTO } from './models/transactionDTO';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private hubConnection!: HubConnection;
  transactions: ITransactionDTO[] = [];
  messages: string[] = [];
  userName: string = "";
  ngOnInit() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('http://localhost:5174/stockHub')
      .build();

    this.hubConnection.start().then(() => {
      console.log('*** connection established');
    }).catch(err => console.log('*** connection error: ' + err));

    //Also show username if page is refreshed
    this.hubConnection.on('login', (name) => {
      var msg = `${name} logged in`;
      this.messages.push(msg);
    });
  }

  login() {
    //x is still null altough the hubConnection should be available here.
    this.hubConnection.send('login', this.userName).then(x => {

    });
  }

}
