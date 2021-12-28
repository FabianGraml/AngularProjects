import { Component, OnInit } from '@angular/core';
import { ValuesService } from 'src/app/core/services/values.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit {

  constructor(private ValuesService: ValuesService) { }

  ngOnInit(): void {
    this.ValuesService.getPersons().subscribe(data => {
      console.log(data);
    });
  }

}
