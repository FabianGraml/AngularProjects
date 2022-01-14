import { Injectable } from '@angular/core';
import { AsyncSubject, BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { IFilter } from 'src/app/models/filter';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  private filterRepository = new ReplaySubject<IFilter>()

  public notify(filter: IFilter){
    console.log(filter)
    this.filterRepository.next(filter)
  }
  public listen():Observable<IFilter>{
    return this.filterRepository.asObservable();
  }
}
