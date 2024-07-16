import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.page.html',
  styleUrls: ['./user-modal.page.scss'],
})
export class UserModalPage implements OnInit {

  emailUsuario: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private modalController: ModalController
  ) {

    this.emailUsuario = JSON.parse(sessionStorage.getItem('email')!);

  }

  ngOnInit() { }

  sair() {

    this.authService.logout().subscribe(response => {
      sessionStorage.clear()
      this.router.navigate(['/']);
      this.modalController.dismiss()
    })

  }

  fecharModal() {
    this.modalController.dismiss();
  }

}
