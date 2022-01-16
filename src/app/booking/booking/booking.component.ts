import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { IPlayerDTO } from 'src/app/models/IPlayerDTO';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  golfClubId : any;
  date : any;
  minute : any;
  hour : any;

  players: IPlayerDTO[] = []
  playersInBooking: string[] = []
  selectedPlayer1!: number;
  selectedPlayer2!: number;
  selectedPlayer3!: number;
  selectedPlayer4!: number;
  flightPartners!: number[];

  currentPlayerId = +sessionStorage.getItem('currentUser')!


  constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(x => {
      this.golfClubId = x.get('golfClubId')
      this.date = x.get('date')
      this.minute = x.get('minute')
      this.hour = x.get('hour')
      this.apiService.getBooking(+this.golfClubId, this.date.toString(), +this.hour, +this.minute).subscribe(x => {
        this.playersInBooking = x.playerNames
      })
    });
    this.apiService.getPlayers().subscribe(x => {
      this.players = x;
    })
  }

  exit(){
    this.router.navigate(['/'])
  }
  onChange(value:any){
    this.players = this.players.filter(x => x.playerId !== value)
    console.log(value)
  }
  addBooking(){

    this.flightPartners = [+this.selectedPlayer1, +this.selectedPlayer2, +this.selectedPlayer3, +this.selectedPlayer4]
    console.log(this.flightPartners)

    //remove every element in array where value is undefined
    this.flightPartners = this.flightPartners.filter(x => x !== undefined)
    console.log(this.flightPartners)

    this.apiService.addPlayer(
      {
        date: this.date, 
        hour: this.hour, 
        minute: this.minute, 
        playerIds: this.flightPartners,
        golfClubId: this.golfClubId
      }).subscribe(x => console.log(x));
  }
}
