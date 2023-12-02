import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/auth.guard';
import { BookingComponent } from './booking/booking.component';

const routes: Routes = [
  { 
    path: '' ,
    children: [
      { path: '', component: BookingComponent}
    ], 
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingRoutingModule {}
