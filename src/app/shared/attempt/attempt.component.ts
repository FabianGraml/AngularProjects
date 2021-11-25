import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-attempt',
  templateUrl: './attempt.component.html',
  styleUrls: ['./attempt.component.scss']
})
export class AttemptComponent implements OnInit {

@Input() availableColors : string[] = [];
@Input() selectedColor: string = '';  


  constructor() { }

  ngOnInit(): void {
  }

}
