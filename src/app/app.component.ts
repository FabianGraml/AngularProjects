import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


interface IPerson {
  id: number,
  firstname: string,
  lastname: string,
  gender: string
}
interface IMatch {
  id: number,
  round: number,
  person1: IPerson,
  person2: IPerson,
  winner: IPerson,
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-template';

  persons: IPerson[] = [];
  matches: IMatch[] = [];

  roundNumber: number = 0;
  statusClass: string = 'btn btn-outline-success';

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.http.get<IPerson[]>('http://localhost:5000/api/persons').subscribe((result) => this.persons = result)
  }
  genereateTournament() {
    this.matches = [];
    this.http.delete<IMatch[]>('http://localhost:5000/api/resetMatchPlan').subscribe((x => {
      this.http.get<IMatch[]>('http://localhost:5000/api/genereateRound').subscribe((result) => { 
        this.matches = result;
        this.roundNumber = this.matches[0].round;
      })
    }))
  }
  nextRound() {
    this.matches = [];
    this.http.get<IMatch[]>('http://localhost:5000/api/genereateRound').subscribe((result) => {
      this.matches = result;
      this.roundNumber = this.matches[0].round;

    })
    if (this.matches.length === 0) {
      this.http.get<IMatch[]>('http://localhost:5000/api/getUnplayedMatch').subscribe((result) => {
        this.matches = result;
        this.roundNumber = this.matches[0].round;
      })
    }
    console.log(this.matches)
  }
  setMatchWinner(mathchId: number, matchWinnerId: number, round: number) {
    this.statusClass = 'btn btn-success';
    const body = {
      "matchId": mathchId,
      "matchWinnerId": matchWinnerId
    }
    this.http.post(`http://localhost:5000/api/setWinner`, body).subscribe(data => {
      console.log(data)
    })

    if (round === 5) {
      const person = this.persons.find(x => x.id == matchWinnerId);
      alert("Winner is: " + person?.firstname + ' ' + person?.lastname)
    }
  }
  isDisabled(): boolean{
    if(this.roundNumber === 5){
      return true;
    }else{
      return false
    }
  }

}
