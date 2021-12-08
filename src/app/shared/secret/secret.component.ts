import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { SecretService } from 'src/app/core/services/secret.service';
import { CasesDistrictDTO } from 'src/app/models/casesDistrictDTO';
import { HospitalizationsDTO } from 'src/app/models/hospitalizationsDTO';
import { IntensiveCareDTO } from 'src/app/models/intensiveCareDTO';

@Component({
  selector: 'app-secret',
  templateUrl: './secret.component.html',
  styleUrls: ['./secret.component.scss']
})
export class SecretComponent implements OnInit {

  intensiveCare!: IntensiveCareDTO;
  hospitalizationsData!: HospitalizationsDTO;
  disctrictData!: CasesDistrictDTO;

  intensiveCarelabels: string[] = ['Intensive Care Bed Cov', 'Intensive Care Bed Free', 'Intensive Care Bed Non Cov'];
  hospitalizationsChartLables: string[] = ['Intensive Care Bed Capacity', 'Intensive Care Bed Covid', 'Intensive Care Bed Free', 'Intensive Care Bed Non Covid', 'Normal Beds Covid'];
  districtCasesLabels: string[] = ['Cases', 'Population', 'Deaths'];

  dataSource1!: ChartDataSets[];

  constructor(private secretService: SecretService) { }

  ngOnInit(): void {
    console.log('SecretComponent::ngOnInit()');
  
    this.secretService.getIntensiveCare().subscribe(data => {
      this.intensiveCare = data;
    }); 

    this.secretService.getHospitalizations().subscribe(data => {
      this.hospitalizationsData = data;
      this.dataSource1 = [{data: [
        this.hospitalizationsData.intensiveCareBedCapacity, 
        this.hospitalizationsData.intensiveCareBedCovid,
        this.hospitalizationsData.intensiveCareBedFree, 
        this.hospitalizationsData.intensiveCareBedNonCovid, 
        this.hospitalizationsData.normalBedsCovid], 
      label: 'Hospitalizations'}];
    });

    this.secretService.getCasesDistrict().subscribe(data => {
         this.disctrictData = data;
    });
  }
}
