import { Component, Input, OnInit } from '@angular/core';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { IFilter } from 'src/app/models/filter';
import { IGolfClubDTO } from 'src/app/models/IGolfClubDTO';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  @Input() golfclubs!: IGolfClubDTO[];
  dates = [
    '17.01.2022',
    '18.01.2022',
    '19.01.2022',
    '20.01.2022',
    '22.01.2022',
  ];

  filter: IFilter = {} as IFilter;

  constructor(private notifierService: NotifierService) {
  }
  
  ngOnInit(): void {
    this.notifierService.notify(this.filter);
  }

  logout() {
    sessionStorage.removeItem('currentUser');
    location.reload();
  }
}
