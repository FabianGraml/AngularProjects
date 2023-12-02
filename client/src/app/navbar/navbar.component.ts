import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

interface IClass {
  clazzId: number;
  clazzName: string;

}
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() clazzs: IClass[] = [];
  @Input() header: string = '';
  @Output() classSelected = new EventEmitter<string>();


  constructor() { }

  ngOnInit(): void {
  }
  classSelectedHandler(clazzName: string) {
    this.classSelected.emit(clazzName);
  }

}
