import { Component, OnInit } from '@angular/core';
import {
  ActionSheetController,
  AlertController,
  ModalController,
} from '@ionic/angular';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { ToastService } from 'src/app/shared/services/toast.service';

import { MomentFormComponent } from '../../components/moment-form/moment-form.component';
import { MomentDTO } from '../../models/moment.dto';
import { MomentsService } from '../../services/moments.service';

@Component({
  selector: 'app-moments',
  templateUrl: './moments.page.html',
  styleUrls: ['./moments.page.scss'],
})
export class MomentsPage implements OnInit {
  userLogged!: string;
  moments: MomentDTO[] = [];
  allMoments: MomentDTO[] = [];
  availableYears: number[] = [];

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private momentService: MomentsService,
    private loadingService: LoadingService,
    private modalController: ModalController,
    private alertController: AlertController,
    private actionSheetController: ActionSheetController
  ) {}

  ngOnInit(): void {
    this.listMoments();

    const user = this.authService.getUserData();
    this.userLogged = user?.displayName || 'Usuário';
  }

  listMoments() {
    this.momentService.getMoments().subscribe((response) => {
      this.moments = response;
      this.allMoments = [...response];

      const yearsSet = new Set(
        response.map((moment) => new Date(moment.date).getFullYear())
      );
      this.availableYears = Array.from(yearsSet).sort((a, b) => b - a);
    });
  }

  async onAdd() {
    const modal = await this.modalController.create({
      component: MomentFormComponent,
      componentProps: {
        formType: 'add',
      },
    });

    await modal.present();
    const { data, role } = await modal.onDidDismiss();

    if (role === 'confirm' && data) {
      this.toastService.showToast('Moment criado com sucesso', 2000);
      this.listMoments();
    }
  }

  async onEdit(moment: MomentDTO) {
    const modal = await this.modalController.create({
      component: MomentFormComponent,
      componentProps: {
        formType: 'edit',
        formData: moment,
      },
    });

    await modal.present();
    const { data, role } = await modal.onDidDismiss();

    if (role === 'confirm' && data?.edited) {
      this.toastService.showToast('Moment editado com sucesso', 2000);
      this.listMoments();
    }
  }

  async onDelete(moment: MomentDTO) {
    const alert = await this.alertController.create({
      header: 'Confirmar exclusão',
      message: `Tem certeza que deseja excluir este Moment?`,
      cssClass: 'alert',
      mode: 'ios',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Excluir', role: 'destructive' },
      ],
    });

    await alert.present();
    const { role } = await alert.onDidDismiss();

    if (role === 'destructive') {
      try {
        await this.loadingService.showLoading();

        if (moment.id) {
          await this.momentService.delete(moment.id);
          this.toastService.showToast('Moment excluído com sucesso', 2000);
          this.listMoments();
        }
      } catch {
        this.toastService.showToast(
          'Não foi possível excluir o moment. Tente novamente.',
          2000
        );
      } finally {
        await this.loadingService.hideLoading();
      }
    }
  }

  async presentItemActions(moment: MomentDTO) {
    const actionSheet = await this.actionSheetController.create({
      header: `${moment.title}`,
      mode: 'ios',
      cssClass: 'action-sheet',
      buttons: [
        {
          text: 'Editar',
          icon: 'create-outline',
          handler: () => this.onEdit(moment),
        },
        {
          text: 'Excluir',
          role: 'destructive',
          icon: 'trash-outline',
          handler: () => this.onDelete(moment),
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          icon: 'close-outline',
        },
      ],
    });

    await actionSheet.present();
  }

  onSearchChange(term: string) {
    const lowerTerm = term.toLowerCase();
    this.moments = this.allMoments.filter((moment) =>
      moment.title.toLowerCase().includes(lowerTerm)
    );
  }

  onYearSelected(year: number) {
    this.moments =
      year === 0
        ? [...this.allMoments]
        : this.allMoments.filter(
            (moment) => new Date(moment.date).getFullYear() === year
          );
  }
}
