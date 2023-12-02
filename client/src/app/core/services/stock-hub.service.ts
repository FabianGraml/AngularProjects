import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StockHubService {
  private hubConnection!: HubConnection;

  connect(): Observable<boolean> {
    const subject = new Subject<boolean>();
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('http://localhost:5174/stockHub')
      .build();

    this.hubConnection
      .start()
      .then((x) => subject.next(true))
      .catch((err) => {
        console.log(err);
        subject.next(false);
      });

      return subject.asObservable();
  }
  onConnectedUsers(): Observable<number> {
    const subject = new Subject<number>();
    this.hubConnection.on('connectedUsers', (x) => {
      subject.next(x);
    });
    return subject.asObservable();
  }
  


  constructor() {}
}
