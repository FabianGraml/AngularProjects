import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { IFilter } from 'src/app/models/filter';
import { IFlight } from 'src/app/models/IFlight';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  constructor(private notifierService: NotifierService) {}

  filter!: IFilter;
  flights: IFlight[] = [];
  selectedGolfClub!: string;
  minutes: number[] = [];
  hours: number[] = [];

  ngOnInit(): void {
    this.notifierService.listen().subscribe((x) => {
      console.log('Change')
      this.filter = x;

      // create hours from 8 to 18 and minutes from 10 to 50  (10 minutes steps)
      this.minutes = [0,30]//[0, 10, 20, 30, 40, 50];
      this.hours = [8,9]//[8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
      this.flights = [];
      for (let i = 0; i < this.hours.length; i++) {
        for (let j = 0; j < this.minutes.length; j++) {
          this.flights.push({
            date: this.filter.date,
            golfClubId: this.filter.golfClubId,
            hour: this.hours[i],
            minute: this.minutes[j],
          });
        }
      }
      console.log(this.flights);
    });
  }
}
