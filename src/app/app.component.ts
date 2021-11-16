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
}
