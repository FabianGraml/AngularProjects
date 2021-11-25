import { Component } from '@angular/core';
import { DummyService } from './core/dummy.service';
import { HttpClient } from '@angular/common/http';
import { Gameboard } from './models/gameboard';
import { GameboardDTO } from './models/gameboardDTO';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-template';
  availableColors: string[] = [];

  constructor(private httpclient: HttpClient) {
    console.log("*** constructor Main");
  }
  ngOnInit() {
    this.httpclient.get<string[]>('http://localhost:50097/api/GetAllColors').subscribe((data) => {
        this.availableColors = data;
      });
  }
}

  
