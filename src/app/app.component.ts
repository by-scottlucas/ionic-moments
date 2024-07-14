import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {

    // authService.isAuthenticated().subscribe(response => {
    //   console.log("Sessão Ativa")
    // });


    // authService.logout().subscribe(response => {
    //   console.log(response)
    //   router.navigate(['/'])
    // })

  }

}
