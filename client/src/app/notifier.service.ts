import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  private stringRepository = new Subject<string>();

  public notify(message: string): void {
    this.stringRepository.next(message);
  }
  public listen(): Observable<string> {
    return this.stringRepository.asObservable();
  }

  constructor() { }
}
