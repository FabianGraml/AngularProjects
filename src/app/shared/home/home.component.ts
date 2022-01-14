import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { IGolfClubDTO } from 'src/app/models/IGolfClubDTO';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  selectedGolfclub!: string;
  selectedDate!: string
  golfclubs!: IGolfClubDTO[];

  constructor(private apiService: ApiService) {  
  }

  ngOnInit(): void {
    this.apiService.getGolfClubs().subscribe(x => {
      this.golfclubs = x;
    });
  }
}
