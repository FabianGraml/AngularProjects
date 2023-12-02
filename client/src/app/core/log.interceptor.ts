import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LogService } from './services/log.service';

@Injectable()
export class LogInterceptor implements HttpInterceptor {

  constructor(private logService: LogService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.logService.notify(`${request.method} --> ${request.urlWithParams}`)
    return next.handle(request);
  }
}
