import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators'; 
import { IGolfClubDTO } from 'src/app/models/IGolfClubDTO';
import { IBookingDTO } from 'src/app/models/IBookingDTO';
import { IPlayerLoginDTO } from 'src/app/models/IPlayerLoginDTO';
import { IPlayerDTO } from 'src/app/models/IPlayerDTO';
import { IBookingRequestDTO } from 'src/app/models/IBookingRequestDTO';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  urlBase = 'https://localhost:5001/api/'
  constructor(private http: HttpClient) { }

  login(playerLoginDTO : IPlayerLoginDTO) : Observable<IPlayerDTO> {
    return this.http.post<IPlayerDTO>(this.urlBase+'login', playerLoginDTO)
     .pipe(tap(user => sessionStorage.setItem('currentUser', user.playerId.toString())));
  }
  getGolfClubs() : Observable<IGolfClubDTO[]>{
    return this.http.get<IGolfClubDTO[]>(this.urlBase+'golfclubs')
  }
  getBooking(golfClubId: number, date: string, hours:number, minutes:number) : Observable<IBookingDTO> {
    return this.http.get<IBookingDTO>(this.urlBase+`booking?golfClubId=${golfClubId}&date=${date}&hours=${hours}&minutes=${minutes}`)
  }
  getPlayers() : Observable<IPlayerDTO[]>{
    return this.http.get<IPlayerDTO[]>(`${this.urlBase}players`) 
  }
  addPlayer(bookingRequestDTO : IBookingRequestDTO) : Observable<IBookingRequestDTO> {
    return this.http.post<IBookingRequestDTO>(`${this.urlBase}booking`, bookingRequestDTO)
  }

}
