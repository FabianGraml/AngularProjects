import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { FormsModule } from '@angular/forms';
import { OverviewComponent } from './overview/overview.component';
import { FlightComponent } from './flight/flight.component';



@NgModule({
  declarations: [
    NavigationComponent,
    OverviewComponent,
    FlightComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    NavigationComponent
  ]
})
export class SharedModule { }
