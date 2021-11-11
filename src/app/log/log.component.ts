import { Component, OnInit } from '@angular/core';
import { NotifierService } from '../notifier.service';


@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {

  constructor(private notifier: NotifierService) { }
  logs: string[] = [];


  ngOnInit(): void {
    this.notifier.listen().subscribe((event) => {
      this.logs.push(event);
    });
  }

}
