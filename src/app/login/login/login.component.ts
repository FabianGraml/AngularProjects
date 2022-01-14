import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import PlayerDTO from 'src/app/models/playerDTO';
import PlayerLoginDTO from 'src/app/models/playerLoginDTO';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email!: string;
  password!: string;
  playerDTO!: Observable<PlayerDTO>;
  errorMessage!: string;
  returnUrl = 'home';

  constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot?.queryParams?.returnUrl || '/';
  }

  login(){
    var playerLoginDTO : PlayerLoginDTO = {
      email: this.email,
      password: this.password,
    }
    this.playerDTO = this.apiService.login(playerLoginDTO);
    this.playerDTO.subscribe(x => {
        console.log(x.playerId)
        if(x.playerId == -1) {this.errorMessage = "Email or Password wrong"}
        else{
        this.router.navigate([this.returnUrl])
        }
    },
    error => {
      console.log(error)
    })
  }


}
