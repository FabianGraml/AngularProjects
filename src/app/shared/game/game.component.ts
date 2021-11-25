import { Component, Input, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gameboard } from '../../models/gameboard';
import GameboardDTO from 'src/app/models/gameboardDTO';
import { GameboardItemComponent } from '../gameboard-item/gameboard-item.component';
import  AttemptDTO  from 'src/app/models/attemptDTO';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  @ViewChild('parent', {read: ViewContainerRef}) target: ViewContainerRef;
  private componentRef: any;


  @Input() username: string = '';
  @Input() attempts: number = 0;
  @Input() gameId: string = '';
  @Input() availableColors: string[] = [];
  @Input() gameboard: Gameboard = {} as Gameboard;

  guess: number = 1;
  attemptColors: string[] = [];
  numbers: number[] = [1];
  attemptDto: AttemptDTO = {} as AttemptDTO; 

  disableSubmitButton: boolean = false;
  appendedHtml: string = '';


  constructor(private httpclient: HttpClient, private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {

  }
  onAttemptChangedHandler(selectedColor: string): void {
    this.attemptColors.push(selectedColor);
  }
  onAttemptSubmitHandler(gameboardDto: GameboardDTO) {
    var body = {
      "id": gameboardDto.id,
      "colors": gameboardDto.guess,
    }
    this.httpclient.put<AttemptDTO>('http://localhost:50097/api/Guess', body).subscribe(
      (data) => {
          this.attemptDto = data;
          if(this.attemptDto.guessesLeft >= 1) {
          if(this.attemptDto.msg != 'You won!' && this.attemptDto.msg != 'You lost!') {
            let childComponent = this.componentFactoryResolver.resolveComponentFactory(GameboardItemComponent);	
            this.componentRef = this.target.createComponent(childComponent);
            this.componentRef.instance.gameboard = this.gameboard;
            this.componentRef.instance.attempts = this.attemptDto.guessesLeft;
            this.componentRef.instance.availableColors = this.availableColors;
            this.componentRef.instance.test = 'test';
            this.componentRef.instance.attemptSubmitHandler.subscribe((event: any) => { this.onAttemptSubmitHandler(event) });
            } 
          }
         
      }
    );
    
    
  
   
  }
}
