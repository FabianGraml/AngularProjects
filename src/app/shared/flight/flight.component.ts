import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { NotifierService } from 'src/app/core/services/notifier.service';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.scss']
})
export class FlightComponent implements OnInit {


  @Input() date! : string;
  @Input() golfClubId!: string;
  @Input() hour: number = 0;
  @Input() minute: number = 0;

  booked: number = 0;

  constructor(private apiService : ApiService, private notifier: NotifierService) { }

  ngOnInit(): void {
    this.notifier.listen().subscribe(x => {
        this.apiService.getBooking(parseInt(this.golfClubId), this.date, this.hour, this.minute).subscribe(x => {
          this.booked = x.isLocked
    });
  });  
  }
}
