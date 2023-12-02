import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { MastermindService } from './mastermind.service';

@Injectable()
export class LogInterceptor implements HttpInterceptor {

  constructor(private mastermindService: MastermindService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.mastermindService.notify(`${request.method} ${request.urlWithParams} ${JSON.stringify(request.body)} ${request.responseType}`)
    return next.handle(request);

  }
}
