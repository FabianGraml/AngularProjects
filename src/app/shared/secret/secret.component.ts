import { Component, OnInit } from '@angular/core';
import { SecretService } from 'src/app/core/services/secret.service';
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

  intensiveCareData: number[] = [];
  intensiveCarelabels: string[] = ['Intensive Care Bed Cov', 'Intensive Care Bed Free', 'Intensive Care Bed Non Cov'];

  hospitalizationsChartData: number[] = [];
  hospitalizationsChartLables: string[] = ['Intensive Care Bed Capacity', 'Intensive Care Bed Covid', 'Intensive Care Bed Free', 'Intensive Care Bed Non Covid', 'Normal Beds Covid'];

  distirctCasesData: number[] = [];
  districtCasesLabels: string[] = ['Cases', 'Population', 'Deaths'];


  constructor(private secretService: SecretService) { }

  ngOnInit(): void {
    console.log('SecretComponent::ngOnInit()');
  
    this.secretService.getIntensiveCare().subscribe(data => {
      this.intensiveCare = data;
      this.intensiveCareData.push(this.intensiveCare.intensiveCareBedCov);
      this.intensiveCareData.push(this.intensiveCare.intensiveCareBedFree);
      this.intensiveCareData.push(this.intensiveCare.intensiveCareBedNonCov);
    });
    this.secretService.getHospitalizations().subscribe(data => {
      this.hospitalizationsData = data;
      this.hospitalizationsChartData.push(this.hospitalizationsData.intensiveCareBedCapacity);
      this.hospitalizationsChartData.push(this.hospitalizationsData.intensiveCareBedCovid);
      this.hospitalizationsChartData.push(this.hospitalizationsData.intensiveCareBedFree);
      this.hospitalizationsChartData.push(this.hospitalizationsData.intensiveCareBedNonCovid);
      this.hospitalizationsChartData.push(this.hospitalizationsData.normalBedsCovid);
    });
    this.secretService.getCasesDistrict().subscribe(data => {
       this.distirctCasesData.push(data.cases);
       this.distirctCasesData.push(data.population);
       this.distirctCasesData.push(data.deathCases);


    });

  }
   


}
