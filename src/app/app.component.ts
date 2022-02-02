import { Component, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { IConnectedUserDTO } from './models/connectedUserDTO';
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
  amountOfUsers = 0;
  loggedIn = false;

  ngOnInit() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('http://localhost:5174/stockHub')
      .build();


    this.hubConnection.on('connectedUsers', (connectedUsers: number) => {
      this.amountOfUsers = connectedUsers;
    });

    this.hubConnection.on('login', (connectedUser: IConnectedUserDTO) => {
      var msg = `${connectedUser.username} logged in`;
      this.amountOfUsers = connectedUser.amountOfUsers;
      this.messages.push(msg);
      this.loggedIn = true;
    });
  }

  login() {
    this.hubConnection.start().then(() => {
      console.log('*** connection established');
      this.hubConnection.send('login', {userName: this.userName, connectedUsers: 0}).then(x => {
        this.loggedIn= true;
      });
        }).catch(err => console.log('*** connection error: ' + err));
  }
  disconnect() {
    this.loggedIn = false;
    this.hubConnection.stop()
    .then(_=>console.log('connection stopped'))
    .catch(err=>console.log('error while stopping connection: ' + err));
  }
}
