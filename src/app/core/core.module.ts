import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DummyService } from './dummy.service';
import { LogInterceptor } from './log.interceptor';
import { MastermindService } from './mastermind.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [DummyService, LogInterceptor, MastermindService],
})

export class CoreModule { }
