import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { StocksComponent } from './stocks/stocks.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LoginComponent,
    StocksComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    LoginComponent,
    StocksComponent
  ]
})
export class SharedModule { }
