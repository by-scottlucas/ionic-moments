import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArrowLeft, CalendarDays, Settings } from 'lucide-angular';
import {
  ActionSheetController,
  AlertController,
  ModalController,
} from '@ionic/angular';

import { MomentDTO } from '../../models/moment.dto';
import { ToastService } from 'src/app/shared/services/toast.service';
import { MomentsService } from '../../services/moments.service';
import { MomentFormComponent } from '../../components/moment-form/moment-form.component';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-moment-detail',
  templateUrl: './moment.detail.page.html',
  styleUrls: ['./moment.detail.page.scss'],
})
export class MomentDetailPage implements OnInit {
  readonly backIcon = ArrowLeft;
  readonly settingsIcon = Settings;
  readonly dateIcon = CalendarDays;

  moment!: MomentDTO | null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private momentService: MomentsService,
    private loadingService: LoadingService,
    private alertController: AlertController,
    private modalController: ModalController,
    private actionSheetController: ActionSheetController
  ) {}

  ngOnInit(): void {
    this.loadMoment();
  }

  private loadMoment(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.toastService.showToast('Moment não encontrado.', 2000);
      this.router.navigate(['/home']);
      return;
    }

    this.momentService.getMomentById(id).subscribe({
      next: (moment) => {
        this.moment = moment;
      },
      error: () => {
        this.toastService.showToast('Erro ao carregar o Moment.', 2000);
        this.router.navigate(['/home']);
      },
    });
  }

  onBack(): void {
    this.router.navigate(['/home']);
  }

  async onOptions(moment: MomentDTO): Promise<void> {
    const actionSheet = await this.actionSheetController.create({
      header: `${moment.title}`,
      mode: 'ios',
      cssClass: 'action-sheet',
      buttons: [
        {
          text: 'Editar',
          icon: 'create-outline',
          handler: async () => {
            await this.loadingService.showLoading();
            await actionSheet.dismiss();
            await this.loadingService.hideLoading();
            await this.onEdit(moment);
          },
        },
        {
          text: 'Excluir',
          role: 'destructive',
          icon: 'trash-outline',
          handler: async () => {
            await this.loadingService.showLoading();
            await actionSheet.dismiss();
            await this.loadingService.hideLoading();
            await this.onDelete(moment);
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

  async onEdit(moment: MomentDTO): Promise<void> {
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

  async onDelete(moment: MomentDTO): Promise<void> {
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
          this.router.navigate(['/home']);
        }
      } catch {
        this.toastService.showToast(
          'Não foi possível excluir o Moment. Tente novamente.',
          2000
        );
      } finally {
        await this.loadingService.hideLoading();
      }
    }
  }

  formatDateFull(dateValue: string | Date): string {
    const date = new Date(dateValue);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  }
}
