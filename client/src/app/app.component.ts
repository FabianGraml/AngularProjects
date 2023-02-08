import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  startValue: number = 0;
  heightValue: number = 0;
  isValid: boolean = false;
  turmNumber: number = 0;
  turm: Array<string> = [];
  turmLine: string = '';

  calculate() {
    this.turm = [];
    this.turmNumber = this.startValue;
    for (let i = 2; i <= this.heightValue; i++) {
      this.turmLine =  (this.turmNumber + '*' + i +'='+this.turmNumber*i).toString();
      this.turm.push(this.turmLine);
      this.turmNumber = this.turmNumber*i;
    }
    for (let i = 2; i <= this.heightValue; i++) {
      this.turmLine =  (this.turmNumber + '/' + i +'='+this.turmNumber/i).toString();
      this.turm.push(this.turmLine);
      this.turmNumber =  this.turmNumber/i;
    }
  }
}