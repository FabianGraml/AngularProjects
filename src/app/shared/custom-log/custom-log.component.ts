import { Component, OnInit, Input, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-custom-log',
  templateUrl: './custom-log.component.html',
  styleUrls: ['./custom-log.component.scss']
})
export class CustomLogComponent implements OnInit {

  @Input() logs: any[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.logs = data.logs;
  }
  
  ngOnInit(): void {
  
  }


}
