import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CaseDTO } from 'src/app/models/casesDTO';
import { DeathsDTO } from 'src/app/models/deathsDTO';
import { GenderCasesDTO } from 'src/app/models/genderCasesDTO';

@Injectable({
  providedIn: 'root'
})
export class ValuesService {

  private urlBase = 'https://localhost:5001/api';	
  constructor(private httpClient: HttpClient) { }

  getCases = () => this.httpClient.get<CaseDTO[]>(this.urlBase + '/cases');
  
  getDeaths = () => this.httpClient.get<DeathsDTO[]>(this.urlBase + '/deaths');
  
  getGenderCases(): Observable<GenderCasesDTO>{
    return this.httpClient.get<GenderCasesDTO>(this.urlBase + '/genderCases');
  }
}
