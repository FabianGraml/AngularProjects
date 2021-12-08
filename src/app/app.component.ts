import { Component } from '@angular/core';
import { AuthenticationService } from './core/services/authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-template';

  isLoggedIn: boolean = false;

  constructor(private authService: AuthenticationService){}

  ngOnInit(){
    if(localStorage.getItem('currentUser')){
      this.isLoggedIn = true;
    }
    else{
      this.isLoggedIn = false;
    }
  }
   
   logout(){
      this.authService.logout();
      location.reload();
    
   }

}
