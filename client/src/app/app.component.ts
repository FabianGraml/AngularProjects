import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ChartConfiguration, ChartDataset } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ShareDto } from './models/shareDTO';
import { ShareTickDto } from './models/shareTickDto';
import { TransactionDto } from './models/transactionDTO';
import { UserDto } from './models/userDTO';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private hubConnection!: HubConnection;

  logs: string[] = [];

  userName: string = '';
  errorMsg!: string;
  currentUser: UserDto = {} as UserDto;
  amountOfConnectedUsers = 0;
  loggedIn = false;
  shares: ShareDto[] = [];
  selectedShare: ShareDto = {} as ShareDto;
  shareAmount: number = 0;
  transactionDto!: TransactionDto;

  shareMarket: ShareTickDto[] = [];

  lineChartData: ChartConfiguration['data'] = { datasets: [], labels: [] };
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  lineChartOptions: ChartConfiguration['options'] = {responsive: true,
    maintainAspectRatio: false,
  }

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.chart?.update();
    this.http
      .get<ShareDto[]>('https://localhost:7174/api/Stock/GetStocks')
      .subscribe((x) => {
        this.shares = x;
        this.shares = x;
        x.slice(0,5).forEach(share => {
          this.lineChartData.datasets.push({
            label: share.name,
            data: [],
            fill: 'origin'
          })
        })
      });
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('http://localhost:5174/stockHub')
      .build();

    this.hubConnection.on('connectedUsers', (connectedUsers: number) => {
      this.amountOfConnectedUsers = connectedUsers;
      console.log(connectedUsers);
    });
    this.hubConnection.on('newStocks', (shareTickDto: ShareTickDto[]) => {
      this.shareMarket = shareTickDto;
      this.lineChartData.labels!.push(new Date().toISOString().substr(11, 8));
      //sort shareTickDto by VAL
      this.shareMarket.sort((a, b) => b.val + a.val);
      
      shareTickDto.slice(0, 5).forEach(share => {
        this.lineChartData.datasets.find(y => y.label == share.name)?.data.push(share.val);
      })
      this.chart?.update();
    });

    this.hubConnection.on(
      'transactionReceived',
      (transactionDto: TransactionDto) => {
        if (transactionDto.shareName === '') {
          alert(
            'Cannot buy share as you wish to buy more shares than are in stock'
          );
        }
        else  if (transactionDto.price > this.currentUser.cash) {
          alert("Cannot buy share as don't have enough money");
        }
        else if (transactionDto.isUserBuy && transactionDto.shareName !== '' && transactionDto.price < this.currentUser.cash && transactionDto.shareName != '') {
          this.logs.push(
            `${transactionDto.username} bought ${transactionDto.amount} shares of ${transactionDto.shareName} for ${transactionDto.price}€`
          );
          this.currentUser.cash -= transactionDto.price;
        }
      }
    );
  }

  login() {
    this.http
      .get<UserDto>(
        'https://localhost:7174/api/Stock/Login?username=' + this.userName
      )
      .subscribe(
        (x) => {
          if (x.id != -1) {
            this.currentUser = x;
            console.log(this.currentUser);
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
  buyShare() {
    console.log(this.selectedShare.name);
    var transactionDto = {
      username: this.currentUser.name,
      shareName: this.selectedShare.name,
      price:
        this.shareMarket.find((x) => x.name === this.selectedShare.name)!.val *
        this.shareAmount,
      amount: this.shareAmount,
      isUserBuy: true,
    };
    this.hubConnection
      .invoke('buyShare', transactionDto)
      .catch((err) => console.log('error while sending message: ' + err));
   
  }
  sellShare() {}
}
