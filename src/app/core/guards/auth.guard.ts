import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from 'src/app/features/auth/services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.authService.isAuthenticated().pipe(map((response: any) => {

      if (response.token) {
        return true;
      } else {
        this.router.navigate(['/auth']);
        return false;
      }

    }), catchError(error => {
      this.router.navigate(['/auth']);
      return new Observable<boolean>(observer => observer.next(false));
    }));

  }

}
