import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game/game.component';
import { IrrelevantRequestsPipe } from './pipes/irrelevant-requests.pipe';
import { AttemptComponent } from './attempt/attempt.component';



@NgModule({
  declarations: [
    GameComponent,
    IrrelevantRequestsPipe,
    AttemptComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    GameComponent,
    IrrelevantRequestsPipe
  ]
})
export class SharedModule { }
