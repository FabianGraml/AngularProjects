import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DummyService {
  val = 1;
  constructor() {
    console.log('*** constructor DummyService');
  }
  getNext(): number {
    this.val++;
    return this.val;
  }
}
