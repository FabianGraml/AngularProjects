import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game/game.component';
import { IrrelevantRequestsPipe } from './pipes/irrelevant-requests.pipe';
import { AttemptComponent } from './attempt/attempt.component';
import { GameboardItemComponent } from './gameboard-item/gameboard-item.component';
import { CustomLogComponent } from './custom-log/custom-log.component';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    GameComponent,
    IrrelevantRequestsPipe,
    AttemptComponent,
    GameboardItemComponent,
    CustomLogComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
  ],
  exports: [
    GameComponent,
    IrrelevantRequestsPipe,
    AttemptComponent,
    GameboardItemComponent,
    CustomLogComponent,
  ]
})
export class SharedModule { }
