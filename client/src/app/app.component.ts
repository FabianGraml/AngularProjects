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

  constructor(private http: HttpClient){}
  
  customers: ICustomer[] = [];
  userToSearch: Number = 0;
  userToDelete: Number = 0;
  customer: ICustomer = {} as ICustomer;
  

  getAllCustomers():void{
    this.http.get<ICustomer[]>('http://localhost:8000/api/customers')
      .subscribe(result => this.customers = result);
  }
  getSingleUser():void{
    this.http.get<ICustomer>('http://localhost:8000/api/customers/'+this.userToSearch)
    .subscribe(result => {
      console.dir(result)
      this.customer = result;
    });
  }
  deleteUser():void{
    this.http.delete('http://localhost:8000/api/customers/'+this.userToDelete)
    .subscribe(result => {
      console.dir(result)
    });
  }
=======
  title = 'angular-template';

  persons: IPerson[] = [];
  matches: IMatch[] = [];

  roundNumber: number = 0;
  roundNames: string [] = ['', 'Round of 32', 'Round of 16', 'Quarterfinals', 'Semifinals', 'Final']
  statusClass: string = 'btn btn-outline-success';
  container1Visible:boolean = false;
  container2Visible: boolean = true;
  selectedGender: number = 0;
  firstnameInput: string = '';
  lastnameInput: string = '';
  winner: IPerson = {} as IPerson;

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.http.get<IPerson[]>('http://localhost:5000/api/persons').subscribe((result) => this.persons = result)
    this.http.get<IMatch[]>('http://localhost:5000/api/getUnplayedMatch').subscribe((result) => {
    this.matches = result;
    this.roundNumber = this.matches[0].round;
  })
  }
  genereateTournament() {
    this.matches = [];
    this.winner = {} as IPerson;
    this.http.delete<IMatch[]>('http://localhost:5000/api/resetMatchPlan').subscribe((x => {
      this.http.get<IMatch[]>('http://localhost:5000/api/genereateRound').subscribe((result) => { 
        this.matches = result;
        this.roundNumber = this.matches[0].round;
      })
    }))
  }
  nextRound() {
  //  this.matches = [];
    this.http.get<IMatch[]>('http://localhost:5000/api/genereateRound').subscribe((result) => {
      this.matches = result;
      this.roundNumber = this.matches[0].round;
    }, error => {
      alert('There are still some rounds to play in round: '+this.roundNumber)
    })
    if (this.matches.length === 0) {
      this.http.get<IMatch[]>('http://localhost:5000/api/getUnplayedMatch').subscribe((result) => {
        this.matches = result;
        this.roundNumber = this.matches[0].round;
      })
  }
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
      this.winner = this.persons.find(x => x.id == matchWinnerId) as IPerson;
    }
  }
  isDisabled(): boolean{
    if(this.roundNumber === 5){
      return true;
    }else{
      return false
    }
  }
  isWinner(playerNumber: number, matchId: number) : string{
    var match = this.matches.find(x => x.id == matchId);
    if(match?.winner.id == playerNumber){
      return 'primary'
    }
    else{
      return 'warn'
    }
  }
  restore(){
      this.container1Visible = false;
      this.container2Visible = true;
  }
  addPerson(){
    console.log(this.firstnameInput)
    var gender = '';
    if(this.selectedGender == 1){
        gender = 'Male';
    }else if(this.selectedGender == 2){
      gender = 'Female';

    }
    const body = {
      "firstname": this.firstnameInput,
      "lastname": this.lastnameInput,
      "gender": gender
    }
    this.http.post(`http://localhost:5000/api/addPerson`, body).subscribe(data => {
      console.log(data)
    })
  }

}
