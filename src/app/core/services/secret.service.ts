import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CasesDistrictDTO } from 'src/app/models/casesDistrictDTO';
import { IntensiveCareAllTimeDTO } from 'src/app/models/intensiveCareAllTimeDTO';
import { IntensiveCareDTO } from 'src/app/models/intensiveCareDTO';

@Injectable({
  providedIn: 'root'
})
export class SecretService {
  private urlBase = 'https://localhost:5001/api';	

  constructor(private httpClient: HttpClient) { }

  getIntensiveCare = () => this.httpClient.get<IntensiveCareDTO>(this.urlBase + '/intensiveCare');

  getIntensiveCareAllTime = () => this.httpClient.get<IntensiveCareAllTimeDTO[]>(this.urlBase + '/intensiveCareAllTime');
  
  getCasesDistrict = () => this.httpClient.get<CasesDistrictDTO>(this.urlBase + '/casesGKZ');
}
