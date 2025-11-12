import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/features/auth/services/auth.service';
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
    private modalController: ModalController
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
