import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { LoginModule } from './login/login.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { LogInterceptor } from './core/log.interceptor';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    LoginModule,
    AppRoutingModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: LogInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
