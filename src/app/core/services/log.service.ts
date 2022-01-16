import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  private subject = new ReplaySubject<string>()

  constructor() { }

  public notify(msg: string){
    console.log('NOTIFY')
    this.subject.next(msg)
  }
  public listen() : Observable<string> {
    console.log('LISTEN')
    return this.subject.asObservable();
  }

}
