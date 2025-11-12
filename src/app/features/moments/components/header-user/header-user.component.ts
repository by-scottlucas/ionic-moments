import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  ActionSheetController,
  AlertController,
  ModalController,
} from '@ionic/angular';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { ProfilePage } from 'src/app/features/profile/pages/profile/profile.page';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.scss'],
})
export class HeaderUserComponent implements OnInit {
  avatarImage =
    'https://sm.ign.com/ign_pk/cover/a/avatar-gen/avatar-generations_rpge.jpg';
  @Input() username!: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService,
    private loadingService: LoadingService,
    private alertController: AlertController,
    private modalController: ModalController,
    private actionSheetController: ActionSheetController
  ) {}

  ngOnInit() {}

  async showUserActions(): Promise<void> {
    const actionSheet = await this.actionSheetController.create({
      mode: 'ios',
      cssClass: 'action-sheet',
      buttons: [
        {
          text: 'Editar perfil',
          handler: async () => {
            await this.loadingService.showLoading();
            await actionSheet.dismiss();
            await this.loadingService.hideLoading();
            await this.onEditProfile();
          },
        },
        {
          text: 'Sair',
          role: 'destructive',
          handler: async () => {
            await this.loadingService.showLoading();
            await actionSheet.dismiss();
            await this.loadingService.hideLoading();
            await this.onLogout();
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
        },
      ],
    });

    await actionSheet.present();
  }

  async onEditProfile(): Promise<void> {
    const modal = await this.modalController.create({
      component: ProfilePage,
    });

    await modal.present();
    const { data, role } = await modal.onDidDismiss();

    if (role === 'confirm' && data?.edited) {
      this.toastService.showToast('Perfil atualizado com sucesso', 2000);
    }
  }

  async onLogout() {
    const alert = await this.alertController.create({
      header: 'Sair',
      message: `Tem certeza que deseja sair?`,
      cssClass: 'alert',
      mode: 'ios',
      buttons: [
        { text: 'Não', role: 'cancel' },
        { text: 'Sim', role: 'destructive' },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();

    if (role === 'destructive') {
      try {
        await this.loadingService.showLoading();
        await this.authService.logout().then(() => {
          this.router.navigate(['/auth']);
        });
      } catch {
        this.toastService.showToast(
          'Não foi possível sair. Tente novamente.',
          2000
        );
      } finally {
        await this.loadingService.hideLoading();
      }
    }
  }
}
