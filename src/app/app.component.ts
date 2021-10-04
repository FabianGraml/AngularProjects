import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'

interface ICustomer{
  id: number;
  firstname: string,
  lastname: string,
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  constructor(private http: HttpClient){}
  
  customers: ICustomer[] = [];
  

  getAllCustomers():void{
    this.http.get<ICustomer[]>('http://localhost:8000/api/customers')
      .subscribe(result => this.customers = result);


  }
}
