import { Injectable, inject } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpHeaders,
  HttpEventType,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly _authService = inject(AuthService);

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authorizedRequest = request.clone({
      headers: request.headers.append('Authorization', `Bearer ${this._authService.getToken()}`),
    });

    return next.handle(authorizedRequest).pipe(
      catchError((err: any) => {
        console.log(err);

        if (err.status === 401) {
          this._authService.logout();
        }
        return throwError(() => err);
      })
    );
  }
}
