import { Injectable } from '@angular/core';
import { AsyncSubject, BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { IFilter } from 'src/app/models/IFilter';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  private filterRepository = new ReplaySubject<IFilter>()

  public notify(filter: IFilter){
    this.filterRepository.next(filter)
  }
  public listen():Observable<IFilter>{
    return this.filterRepository.asObservable();
  }
}
