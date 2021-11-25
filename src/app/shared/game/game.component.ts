import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gameboard } from '../../models/gameboard';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  @Input() username: string = '';
  @Input() attempts: number = 0;
  @Input() gameId: string = '';
  @Input() availableColors: string[] = [];
  @Input() gameboard: Gameboard = {} as Gameboard;;

  selectedColorLength : string[] = ['d', 'd', 'd', 'd']
  attemptColors: string[] = [];
  numbers: number[] = [1];
  hint: string = '';

  constructor(private httpclient: HttpClient) { }

  ngOnInit(): void {
   
  }
  onAttemptChangedHandler(selectedColor: string): void {
    this.attemptColors.push(selectedColor);
  }
  onSubmitAttemptClick(){
 
    this.numbers.push(1);
    
    var body = {
      "id": this.gameboard.id,
      "colors":  this.attemptColors,
      
    }
    console.log(body);
    this.httpclient.put<string>('http://localhost:50097/api/Guess', body).subscribe(
      (data) => {
        this.hint = data;
        console.log(this.hint);
      }
    );
    this.attemptColors = [];
  }

  

}
