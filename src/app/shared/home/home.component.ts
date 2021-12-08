import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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

  chartData: number[] = [];
  chartLabel: string[] = [];

  casesLabelSource: string[] = [];
  casesDataSource: number[] = []

  deathLabelSource: string[] = [];
  deathDataSource: number[] = []


  constructor(private valuesService: ValuesService) {
  }

  ngOnInit(): void {
    console.log('HomeComponent::ngOnInit()');
  
    this.valuesService.getGenderCases().subscribe(data => {
      this.genderCases = data;
      this.chartData.push(this.genderCases.femaleCases);
      this.chartData.push(this.genderCases.maleCases);
      this.chartLabel.push('Male');
      this.chartLabel.push('Female');
    });
    this.valuesService.getCases().subscribe(data => {
      data.forEach(x => this.casesLabelSource.push(x.date))
      data.forEach(x => this.casesDataSource.push(Number(x.newCases)))
    });
    this.valuesService.getDeaths().subscribe(data => {
      data.forEach(x => this.deathLabelSource.push(x.date))
      data.forEach(x => this.deathDataSource.push(Number(x.deaths)))
    });
   


  
  }

}
