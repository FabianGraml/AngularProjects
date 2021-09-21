import { Component } from '@angular/core';

interface TowerItem {
  towerBase: number;
  towerOperator: string;
  towerFactor: number;
  towerResult: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  startValue: number = 0;
  height: number = 0;
  isValid: boolean = false;
  towerBase: number = 0;
  tower: Array<string> = [];
  towerLine: string = '';
  currentTowerNumber: number = 0;

  calculate() {
    this.tower = [];
    this.towerBase = this.startValue;
    for (let i = 2; i <= this.height; i++) {
      this.towerLine =  (this.towerBase + '*' + i +'='+this.towerBase*i).toString();
      this.tower.push(this.towerLine);
      this.towerBase = this.towerBase*i;

    }
    for (let i = 2; i <= this.height; i++) {
    
      this.towerLine =  (this.towerBase + '/' + i +'='+this.towerBase/i).toString();
      this.tower.push(this.towerLine);
      this.towerBase =  this.towerBase/i;
       
    }
    console.log(this.tower)
  }

}