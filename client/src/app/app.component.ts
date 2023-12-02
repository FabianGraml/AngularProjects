import { Component, Output, EventEmitter } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Gameboard } from './models/gameboard';
import { CustomLogComponent } from './shared/custom-log/custom-log.component';
import { MatDialog } from '@angular/material/dialog';
import { MastermindService } from './core/mastermind.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  title = 'angular-template';
  availableColors: string[] = [];
  startNewGame: boolean = true;
  game: boolean = false;
  attempts: number = 0;
  username: string = "";
  gameboard: Gameboard = new Gameboard();
  logs: any[] = [];

  constructor(private httpclient: HttpClient, public dialog: MatDialog, private mastermindService: MastermindService) {
  }
  ngOnInit() {
    this.httpclient.get<string[]>('http://localhost:50097/api/GetAllColors').subscribe((data) => {
        this.availableColors = data;
      });
      this.mastermindService.listen().subscribe((event) => {
        this.logs.push(event);
        console.log(this.logs)
        console.log(event);
     });
  }
  onClickStartNewGame() {
    this.startNewGame = true;
    this.game = false;
  }
  onClickCreateGame(){
    this.startNewGame = false;
    this.game = true;
     this.httpclient.get<Gameboard>('http://localhost:50097/api/CreateGame/'+this.attempts).subscribe(
      (data) => {
        this.gameboard = data;
      }
    );
  }
  openDialog() {

     this.dialog.open(CustomLogComponent, { 
       data: {
          logs: this.logs
       }
     });
  }


}

  
