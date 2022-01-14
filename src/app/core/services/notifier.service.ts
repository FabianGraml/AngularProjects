import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { IFilter } from 'src/app/models/filter';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  private filterRepository = new ReplaySubject<IFilter>()

  notify(filter: IFilter){
    console.log('NOTIFY')
    this.filterRepository.next(filter)
  }
  listen():Observable<IFilter>{
    console.log('LISTEN')
    return this.filterRepository.asObservable();
  }
}
