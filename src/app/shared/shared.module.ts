import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonListComponent } from './components/person-list/person-list.component';
import { PersonEditComponent } from './components/person-edit/person-edit.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PersonListComponent,
    PersonEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    PersonListComponent,
    PersonEditComponent
  ]
})
export class SharedModule { }
