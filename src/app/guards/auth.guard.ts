import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    //  CHECAR DEPOIS
    
    // if (this.authService.isAuthenticated()) {
    //   return this.router.parseUrl('/home');
    // } else {
    //   return true;
    // }

    return this.authService.isAuthenticated().pipe(map((response: any) => {

      if (response.token) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }

    }), catchError(error => {
      this.router.navigate(['/login']);
      return new Observable<boolean>(observer => observer.next(false));
    }));

  }

}
