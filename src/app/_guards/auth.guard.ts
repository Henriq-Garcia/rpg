import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../_services/auth/auth.service';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AlertService } from '../_services/alert/alert.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private alertService: AlertService) {}

  canActivate(): Observable<boolean> {
    const token = localStorage.getItem('token');
    const refresh = localStorage.getItem('refresh');

    if (!token || !refresh) {
      this.alertService.addAlert("Don't have token or refreshToken", "warning")
      this.router.navigate(['/login']);
      return of(false);
    }

    return this.authService.validateToken(token, 'token').pipe(
      switchMap((val) => {
        if (val.valid) {
          return of(true);
        } else {
          return this.refreshToken(refresh);
        }
      }),
      catchError(() => this.refreshToken(refresh))
    );
  }

  private refreshToken(refresh: string): Observable<boolean> {
    return this.authService.validateToken(refresh, 'refresh').pipe(
      switchMap((val) => {
        if (!val.valid) {
          this.alertService.addAlert(val.valid.toString(), 'info')
          this.alertService.addAlert("invalid token", "warning")
          this.router.navigate(['/login']);
          return of(false);
        }
        return this.authService.refresh(refresh).pipe(
          map((newToken) => {
            localStorage.setItem('token', newToken.token);
            return true;
          }),
          catchError(() => {
            this.router.navigate(['/login']);
            return of(false);
          })
        );
      }),
      catchError(() => {
        this.alertService.addAlert("invalid refreshToken", "warning")
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}
