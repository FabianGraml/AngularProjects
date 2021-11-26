import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { GameboardItemComponent } from './shared/gameboard-item/gameboard-item.component';
import { LogInterceptor } from './core/log.interceptor';
import { MastermindService } from './core/mastermind.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,   
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: LogInterceptor, multi: true, deps: [MastermindService]}],
  bootstrap: [AppComponent],
  entryComponents: [GameboardItemComponent] // define the dynamic component here in module.ts

})
export class AppModule { }
