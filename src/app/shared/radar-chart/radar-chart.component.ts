import { Component, Input } from '@angular/core';
import { ChartDataSets, ChartType, RadialChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.scss']
})

export class RadarChartComponent {

  @Input() data!: ChartDataSets[];
  @Input() radarChartLabels!: string[];

  public radarChartOptions: RadialChartOptions = {
    responsive: true,
  };


 
  public radarChartType: ChartType = 'radar';

}