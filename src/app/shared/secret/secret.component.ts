import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { SecretService } from 'src/app/core/services/secret.service';
import { CasesDistrictDTO } from 'src/app/models/casesDistrictDTO';
import { IntensiveCareAllTimeDTO } from 'src/app/models/intensiveCareAllTimeDTO';
import { IntensiveCareDTO } from 'src/app/models/intensiveCareDTO';

@Component({
  selector: 'app-secret',
  templateUrl: './secret.component.html',
  styleUrls: ['./secret.component.scss']
})
export class SecretComponent implements OnInit {

  intensiveCare: IntensiveCareDTO = {} as IntensiveCareDTO;
  disctrictData: CasesDistrictDTO = {} as CasesDistrictDTO;
  intensiveCareAllTime: IntensiveCareAllTimeDTO = {} as IntensiveCareAllTimeDTO;

  intensiveCareLabelSource: string[] = [];
  intensiveCareSource: number[] = [];

  intensiveCarelabels: string[] = ['Intensive Care Bed Cov', 'Intensive Care Bed Free', 'Intensive Care Bed Non Cov'];
  hospitalizationsChartLables: string[] = ['Intensive Care Bed Capacity', 'Intensive Care Bed Covid', 'Intensive Care Bed Free', 'Intensive Care Bed Non Covid', 'Normal Beds Covid'];
  districtCasesLabels: string[] = ['Cases', 'Deaths'];

  dataSource1: ChartDataSets[] = [];

  constructor(private secretService: SecretService) { }

  ngOnInit(): void {
    console.log('SecretComponent::ngOnInit()');
  
    this.secretService.getIntensiveCare().subscribe(data => {
      this.intensiveCare = data;
    }); 

    this.secretService.getIntensiveCareAllTime().subscribe(data => {
        data.forEach(x => this.intensiveCareLabelSource.push(x.date))
        data.forEach(x => this.intensiveCareSource.push(x.intensiveCareNumber))
        this.dataSource1 = [{data: this.intensiveCareSource, label: 'Intensive Care'}];
        console.log(this.dataSource1)
      });

    this.secretService.getCasesDistrict().subscribe(data => {
         this.disctrictData = data;
    });
  }
}
