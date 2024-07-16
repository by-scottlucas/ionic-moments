import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
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
    private modalController: ModalController,
    private loadingController: LoadingController
  ) {

    this.emailUsuario = JSON.parse(sessionStorage.getItem('email')!);

  }

  ngOnInit() { }

  async sair() {

    const loading = await this.loadingController.create({
      message: 'Saindo...',
      duration: 100,
      spinner: 'circles',
      cssClass: 'loading-modal'
    });

    await loading.present();

    // Esperar o tempo de duração do loading
    await loading.onDidDismiss();

    this.authService.logout().subscribe(async () => {
      sessionStorage.clear();
      this.router.navigate(['/']);
      this.modalController.dismiss();
    });

  }

  fecharModal() {
    this.modalController.dismiss();
  }

}
