import { inject, Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const authToken = authService.getToken();
  
    let authReq = req;
    if (authToken) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `${authToken}`,
        },
      });
    }
  
    return next(authReq).pipe(
      catchError(err => {
        if (err.status === 401 || err.status === 403) {
          authService.logout();
        }
        return throwError(() => err);
      })
    );
  };
