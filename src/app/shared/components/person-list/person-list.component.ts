import { Component, OnInit } from '@angular/core';
import { NotifyService } from 'src/app/core/services/notify.service';
import { ValuesService } from 'src/app/core/services/values.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit {

  constructor(private ValuesService: ValuesService, private notify: NotifyService) { }

  persons: any[] = [];

  ngOnInit(): void {
    this.ValuesService.getPersons().subscribe(data => {
      this.persons = data;
      console.log(data);
    });

    this.notify.listen().subscribe(id => {
      this.ValuesService.getPersons().subscribe(data => {
        this.persons = data;
        console.log(data);
      });
    });
  }

}
