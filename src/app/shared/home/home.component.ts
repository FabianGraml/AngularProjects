import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color } from 'ng2-charts';
import { Observable } from 'rxjs';
import { ValuesService } from 'src/app/core/services/values.service';
import { CaseDTO } from 'src/app/models/casesDTO';
import { DeathsDTO } from 'src/app/models/deathsDTO';
import { GenderCasesDTO } from 'src/app/models/genderCasesDTO';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  deaths!: Observable<DeathsDTO>;
  newCases: CaseDTO[] = [];
  genderCases!: GenderCasesDTO;

  colors!: Color[];

  casesLabelSource: string[] = [];
  casesDataSource: number[] = []

  deathLabelSource: string[] = [];
  deathDataSource: number[] = []

  dataSource1: ChartDataSets[] = [];
  dataSource2: ChartDataSets[] = [];


  constructor(private valuesService: ValuesService) {
  }

  ngOnInit(): void {
    console.log('HomeComponent::ngOnInit()');
  
    this.valuesService.getGenderCases().subscribe(data => {
      this.genderCases = data;
      this.colors = [{
        backgroundColor: [
          '#FFB6C1',
          '#ADD8E6',
        
        ]
      }];
    });
    this.valuesService.getCases().subscribe(data => {
      data.forEach(x => this.casesLabelSource.push(x.date))
      data.forEach(x => this.casesDataSource.push(Number(x.newCases)))
      this.dataSource1 = [{data: this.casesDataSource, label: 'New Cases'}]
    });
    this.valuesService.getDeaths().subscribe(data => {
      data.forEach(x => this.deathLabelSource.push(x.date))
      data.forEach(x => this.deathDataSource.push(Number(x.deaths)))
      this.dataSource2 = [{data: this.deathDataSource, label: 'Deaths'}]

    });
   


  
  }

}
