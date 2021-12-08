import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ChartsModule } from 'ng2-charts';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { SecretComponent } from './secret/secret.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { RadarChartComponent } from './radar-chart/radar-chart.component';

@NgModule({
  declarations: [
    HomeComponent,
    PieChartComponent,
    LineChartComponent,
    SecretComponent,
    LoginComponent,
    RadarChartComponent,
  ],
  imports: [
    CommonModule,
    ChartsModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    HomeComponent
  ]
})
export class SharedModule { }
