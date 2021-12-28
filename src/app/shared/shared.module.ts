import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonListComponent } from './components/person-list/person-list.component';
import { PersonEditComponent } from './components/person-edit/person-edit.component';



@NgModule({
  declarations: [
    PersonListComponent,
    PersonEditComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PersonListComponent,
    PersonEditComponent
  ]
})
export class SharedModule { }
