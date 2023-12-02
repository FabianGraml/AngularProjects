import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { AuthDTO } from 'src/app/models/authDTO';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email = 'fabian.graml@gmail.com';
  password = '12345';
  authenticationDto!: AuthDTO;
  errorMessage = '';
  returnUrl: any = '/';

  constructor(private authService: AuthenticationService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    console.log('LoginComponent::ngOnInit()');
    this.returnUrl = this.route.snapshot?.queryParams?.returnUrl || '/secret';
  }
  public login(): void {
    this.authService.logout();
    console.log('LoginComponent::login');
    this.errorMessage = '';
    this.authService.login(this.email, this.password).subscribe(
      x => {
        this.authenticationDto = x;
        window.location.href="/secret"
      },
      err => {
        this.errorMessage = `${err.statusText}/${err.status} - User`
      }
    );
  }

}
