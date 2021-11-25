import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game/game.component';
import { IrrelevantRequestsPipe } from './pipes/irrelevant-requests.pipe';
import { AttemptComponent } from './attempt/attempt.component';
import { GameboardItemComponent } from './gameboard-item/gameboard-item.component';



@NgModule({
  declarations: [
    GameComponent,
    IrrelevantRequestsPipe,
    AttemptComponent,
    GameboardItemComponent
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
