import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { FormsModule } from '@angular/forms';
import { OverviewComponent } from './overview/overview.component';
import { FlightComponent } from './flight/flight.component';
import { NumberFormatPipe } from './number-format.pipe';
import { HomeComponent } from './home/home.component';
import { PlayerToStringPipe } from './player-to-string.pipe';



@NgModule({
  declarations: [
    NavigationComponent,
    OverviewComponent,
    FlightComponent,
    NumberFormatPipe,
    HomeComponent,
    OverviewComponent,
    PlayerToStringPipe
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    NumberFormatPipe,
    FlightComponent,
    PlayerToStringPipe
  ]
})
export class SharedModule { }
