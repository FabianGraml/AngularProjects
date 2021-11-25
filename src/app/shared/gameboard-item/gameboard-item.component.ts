import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import GameboardDTO from '../../models/gameboardDTO';

@Component({
  selector: 'app-gameboard-item',
  templateUrl: './gameboard-item.component.html',
  styleUrls: ['./gameboard-item.component.scss']
})
export class GameboardItemComponent implements OnInit {

  @Input() attempts: any;
  @Input() gameboard: any;
  @Input() availableColors: any;
 buttonDisabled: boolean = false;

  attemptColors: string[] = [];
  selectedColorLength: string[] = ['d', 'd', 'd', 'd']
  id: number = 0;
  submitHidden: boolean = false;
  hintMsg1: string = "";
  hintMsg2: string = "";


  @Output() attemptSubmitHandler = new EventEmitter<GameboardDTO>();
  @Output() guessChangedHandler = new EventEmitter<number>();


  onAttemptChangedHandler(selectedColor: string): void {
    this.attemptColors.push(selectedColor);
  }
  constructor() { }

  ngOnInit(): void {
  }

  onGuessChangedHandler(guess: number) {
    this.guessChangedHandler.emit(guess);
  }

  onSubmitAttemptClick(gameComponentDTO: GameboardDTO) {
    this.attemptSubmitHandler.emit(gameComponentDTO);
    this.submitHidden = true;
    this.buttonDisabled = true;

  }
 
}


