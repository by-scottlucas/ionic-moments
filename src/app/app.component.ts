import { Component } from '@angular/core';
import { AuthService } from './features/auth/services/auth.service';
import { Router } from '@angular/router';
import { filter, take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.user$
      .pipe(
        filter((user) => !!user),
        take(1)
      )
      .subscribe(() => this.router.navigate(['/home']));
  }
}
