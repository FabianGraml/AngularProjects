import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IFilter } from 'src/app/models/filter';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  private subject = new Subject<IFilter>()

  notify(filter: IFilter){
    this.subject.next(filter)
  }
  listen():Observable<IFilter>{
    return this.subject.asObservable();
  }

  constructor() { }
}
