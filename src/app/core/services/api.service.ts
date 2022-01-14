import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import PlayerDTO from 'src/app/models/playerDTO';
import PlayerLoginDTO from 'src/app/models/playerLoginDTO';
import { tap } from 'rxjs/operators'; 
import { IGolfClubDTO } from 'src/app/models/IGolfClubDTO';
import { IBookingDTO } from 'src/app/models/IBookingDTO';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  urlBase = 'https://localhost:5001/api/'
  constructor(private http: HttpClient) { }

  login(playerLoginDTO : PlayerLoginDTO) : Observable<PlayerDTO> {
    return this.http.post<PlayerDTO>(this.urlBase+'login', playerLoginDTO)
     .pipe(tap(user => sessionStorage.setItem('currentUser', user.playerId.toString())));
  }
  getGolfClubs() : Observable<IGolfClubDTO[]>{
    return this.http.get<IGolfClubDTO[]>(this.urlBase+'golfclubs')
  }
  getBooking(golfClubId: number, date: string, hours:number, minutes:number) : Observable<IBookingDTO> {
    return this.http.get<IBookingDTO>(this.urlBase+`booking?golfClubId=${golfClubId}&date=${date}&hours=${hours}&minutes=${minutes}`)
  }


}
