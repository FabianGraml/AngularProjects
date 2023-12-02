import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartDataset, Color } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ShareTickDto } from 'src/app/models/shareTickDto';

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.scss']
})
export class LinechartComponent  {

  @Input() lineChartData: ChartConfiguration['data'] = {
    datasets: [],
    labels: []
  };
  @Input() shareTicks: ShareTickDto[] = [];

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  ngOnInit(): void {
    this.chart?.update();
    console.log(this.lineChartData);
      this.shareTicks.forEach(share => {
        this.lineChartData.datasets.find(y => y.label == share.name)?.data.push(share.val);
      this.chart?.update();
    })
  }


  lineChartOptions: ChartConfiguration['options'] = {responsive: true,
    maintainAspectRatio: false,
  }

}
