import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Auth } from 'aws-amplify';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs';
import { flatMap, catchError } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
// https://stackoverflow.com/questions/45345354/how-use-async-service-into-angular-httpclient-interceptor
    let sessionObservable = from(Auth.currentSession());
    return sessionObservable.pipe(
      flatMap((data: any) => {
        request = request.clone({
          setHeaders: {
            Authorization: data.idToken.jwtToken
          }
        });
        return next.handle(request);
      }),
      catchError(err => {
      return next.handle(request);
      })
    );
  }
}
