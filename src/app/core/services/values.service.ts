import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonDTO } from 'src/app/models/personDTO';

@Injectable({
  providedIn: 'root'
})
export class ValuesService {

  private urlBase = 'https://localhost:5001/api/';

  constructor(private httpClient: HttpClient) { }

  getPersons = () => this.httpClient.get<PersonDTO[]>(this.urlBase + 'Persons');
  getPersonsById = (id:number) => this.httpClient.get<PersonDTO>(this.urlBase + 'Persons/'+id);
  
  addPerson(person:PersonDTO) :Observable<any> {
      return this.httpClient.post<any>(this.urlBase + 'Persons', person);
  }
}
