import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MastermindService {
  private subject = new Subject<string>();

  public notify(message: string): void {
    this.subject.next(message);
  }
  public listen(): Observable<string> {
    return this.subject.asObservable();
  }



}
