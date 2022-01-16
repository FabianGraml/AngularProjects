import { Component, OnInit } from '@angular/core';
import { LogService } from './core/services/log.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-template';

  constructor(private logService: LogService){

  }
  ngOnInit() {
    this.logService.listen().subscribe((x) => {
      console.log(x)
    })
  }
}
