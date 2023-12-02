import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinechartComponent } from './linechart/linechart.component';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    LinechartComponent
  ],
  imports: [
    CommonModule,
    FormsModule, 
    NgChartsModule
  ],
  exports: [
    LinechartComponent
  ]
})
export class SharedModule { }
