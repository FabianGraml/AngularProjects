import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PersonDTO } from 'src/app/models/personDTO';

@Injectable({
  providedIn: 'root'
})
export class ValuesService {

  private urlBase = 'https://localhost:5001/api/';

  constructor(private httpClient: HttpClient) { }

  getPersons = () => this.httpClient.get(this.urlBase + 'Persons');
  getPersonsById = (id:number) => this.httpClient.get(this.urlBase + 'Persons/'+id);
  addPerson = (person:PersonDTO) => this.httpClient.post(this.urlBase + 'Persons', person);

 
}
