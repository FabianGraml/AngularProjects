import { Component } from '@angular/core';
import { DummyService } from './core/dummy.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-template';

  constructor(private dummyService: DummyService) {
    console.log("*** constructor Main");
  }
}
  
