import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from "rxjs/operators";
import { AuthDTO } from 'src/app/models/authDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private urlBase = 'https://localhost:5001/api';

  constructor(private httpClient: HttpClient) { }

  public login(email: string, password: string) {
    console.log(`AuthenticationService::login ${email}`);
    const url = `${this.urlBase}/authenticate`;
    return this.httpClient.post<AuthDTO>(url, { email, password }).pipe(
      tap(user => {
        if(user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
    
    }));
  }
  public logout() {
    console.log(`AuthenticationService::logout`);
    localStorage.removeItem('currentUser');
  }
}
