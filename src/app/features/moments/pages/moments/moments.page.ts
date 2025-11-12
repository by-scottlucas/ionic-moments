import { Component, OnInit } from '@angular/core';
import {
  ActionSheetController,
  AlertController,
  ModalController,
} from '@ionic/angular';
import { CalendarDays, Search } from 'lucide-angular';
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
  readonly searchIcon = Search;
  readonly itemIcon = CalendarDays;

  user = {
    name: 'Lucas Silva',
    avatar:
      'https://sm.ign.com/ign_pk/cover/a/avatar-gen/avatar-generations_rpge.jpg',
  };

  moments: MomentDTO[] = [];

  constructor(
    private toastService: ToastService,
    private momentService: MomentsService,
    private loadingService: LoadingService,
    private modalController: ModalController,
    private alertController: AlertController,
    private actionSheetController: ActionSheetController
  ) {}

  ngOnInit(): void {
    this.listMoments();
  }

  listMoments() {
    this.momentService.getMoments().subscribe((response) => {
      this.moments = response;
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
    }
  }

  async onDelete(moment: MomentDTO) {
    const alert = await this.alertController.create({
      header: 'Confirmar exclusão',
      message: `Tem certeza que deseja excluir este Moment?`,
      cssClass: 'alert',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Excluir',
          role: 'destructive',
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();

    if (role === 'destructive') {
      try {
        await this.loadingService.showLoading();

        if (moment.id) {
          await this.momentService.delete(moment.id!).then(() => {
            this.toastService.showToast('Moment excluido com sucesso', 2000);
            this.listMoments();
          });
        } else {
          console.error('Erro: ID do cartão não encontrado para exclusão.');
        }
      } catch (error) {
        this.toastService.showToast(
          'Não foi possível excluir o cartão. Tente novamente.',
          500
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
          handler: () => {
            this.onEdit(moment);
          },
        },
        {
          text: 'Excluir',
          role: 'destructive',
          icon: 'trash-outline',
          handler: () => {
            this.onDelete(moment);
          },
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
}
