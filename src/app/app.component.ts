import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { IUserDTO } from './models/userDTO';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private hubConnection!: HubConnection;
 
  userName: string = '';
 
  errorMsg!: string;
  currentUser!: IUserDTO;
  amountOfConnectedUsers = 0;
  loggedIn = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('http://localhost:5174/stockHub')
      .build();

    this.hubConnection.on('connectedUsers', (connectedUsers: number) => {
      this.amountOfConnectedUsers = connectedUsers;
    });
  }

  login() {
    this.http
      .get<IUserDTO>(
        'https://localhost:7174/api/Stock/Login?username=' + this.userName
      )
      .subscribe(
        (x) => {
          if (x.id != -1) {
            this.currentUser = x;
            this.hubConnection
              .start()
              .then(() => {
                console.log('connection started');
                this.loggedIn = true;
                this.errorMsg = '';
              })
              .catch((err) => console.log('*** connection error: ' + err));
          } else {
            this.errorMsg = 'Cannot connect to server';
          }
        },
        (error) => {
          this.errorMsg = error;
        }
      );
  }

  disconnect() {
    this.loggedIn = false;
    this.hubConnection
      .stop()
      .then((_) => console.log('connection stopped'))
      .catch((err) => console.log('error while stopping connection: ' + err));
  }
}
