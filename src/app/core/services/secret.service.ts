import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CasesDistrictDTO } from 'src/app/models/casesDistrictDTO';
import { HospitalizationsDTO } from 'src/app/models/hospitalizationsDTO';
import { IntensiveCareDTO } from 'src/app/models/intensiveCareDTO';

@Injectable({
  providedIn: 'root'
})
export class SecretService {
  private urlBase = 'https://localhost:5001/api';	

  constructor(private httpClient: HttpClient) { }

  getIntensiveCare = () => this.httpClient.get<IntensiveCareDTO>(this.urlBase + '/intensiveCare');

  getHospitalizations = () => this.httpClient.get<HospitalizationsDTO>(this.urlBase + '/hospitalizations');
  
  getCasesDistrict = () => this.httpClient.get<CasesDistrictDTO>(this.urlBase + '/casesGKZ');
}
