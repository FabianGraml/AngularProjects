import { Component, OnInit } from '@angular/core';
import { NotifyService } from 'src/app/core/services/notify.service';
import { ValuesService } from 'src/app/core/services/values.service';
import { PersonDTO } from 'src/app/models/personDTO';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.scss'],
})
export class PersonEditComponent implements OnInit {
 
 responseCode!: string
 
  firstName!: string;
  lastName!: string;
  born!: string;
  tel!: string;
  addressString!: string;

  lastlabel: string = '';
  firstlabel: string = '';
  bornlabel: string = '';
  tellabel: string = '';
  addlabel: string = '';

  firstNameRegex = /^[A-Z][a-z]{2,}$/;
  lastNameRegex = /^[A-Z]\w{2,}$/;
  bornRegex =
    /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
  telRegex = /\+\d{1,2} \(\d{2,3}\) \d{4,8}/;
  addressRegex =
    /^(?<CountryCode>[A-Z]{1,2})\-(?<PostalCode>\d{4,5})\s(?<City>\w*),\s(?<Street>\w*)\s(?<HouseNr>\d+)$/;

  constructor(private valueService: ValuesService, private notify: NotifyService) {

  }

  ngOnInit(): void {

  }

  validate(): boolean {
    if (this.firstName == null || this.lastName == null || this.born == null || this.tel == null || this.addressString == null) {
      return false;
    } 
    else if (this.firstName.match(this.firstNameRegex) && this.lastName.match(this.lastNameRegex) && this.born.match(this.bornRegex) && this.tel.match(this.telRegex) && this.addressString.match(this.addressRegex)) {
      return true;
    } else {
      return false;
    }
  }
  lastNameChange() {
    if (!this.lastName.match(this.lastNameRegex)) {
      this.lastlabel = 'Last name is not valid';
    } else {
      this.lastlabel = '';
    }
  }
  firstNameChange() {	
    if (!this.firstName.match(this.firstNameRegex)) {
      this.firstlabel = 'First name is not valid';
    } else {
      this.firstlabel = '';
    }
  }
  bornChange() {
    if (!this.born.match(this.bornRegex)) {
      this.bornlabel = 'Born is not valid';
    } else {
      this.bornlabel = '';
    }
  }
  telChange() {
    if (!this.tel.match(this.telRegex)) {
      this.tellabel = 'Tel is not valid';
    } else {
      this.tellabel = '';
    }
  }
  addressStringChange() {
    if (!this.addressString.match(this.addressRegex)) {
      this.addlabel = 'Address is not valid';
    } else {
      this.addlabel = '';
    }
  }

  addPerson() {
    var person : PersonDTO = {
      firstname: this.firstName,
      lastname: this.lastName,
      born: this.born,
      tel: this.tel,
      addressString: this.addressString
    }
    this.valueService.addPerson(person).subscribe((data) => {
      this.responseCode = data.statusText;
      this.notify.notify(1);
    });
  }
}
