import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-attempt',
  templateUrl: './attempt.component.html',
  styleUrls: ['./attempt.component.scss']
})
export class AttemptComponent implements OnInit {

@Input() availableColors : string[] = [];
@Input() selectedColor: string = '';  
@Output() selectedAttemptColorChanged = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }
  

  attemptChangedHandler(selectedAttemptColorChanged: any): void {
     this.selectedAttemptColorChanged.emit(selectedAttemptColorChanged);
  }

}
