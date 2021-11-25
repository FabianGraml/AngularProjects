import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  @Input() username: string = '';
  @Input() gameId: string = '';
  @Input() availableColors: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
