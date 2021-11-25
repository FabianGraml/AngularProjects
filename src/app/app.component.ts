import { Component } from '@angular/core';
import { DummyService } from './core/dummy.service';
import { HttpClient } from '@angular/common/http';
import { Gameboard } from './models/gameboard';
import { GameboardDTO } from './models/gameboardDTO';


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

  constructor(private httpclient: HttpClient) {
    console.log("*** constructor Main");
  }
  ngOnInit() {
    this.httpclient.get<string[]>('http://localhost:50097/api/GetAllColors').subscribe((data) => {
        this.availableColors = data;
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

}

  
