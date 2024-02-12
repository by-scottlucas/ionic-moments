import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IMoment } from 'src/app/models/IMoment';
import { MomentService } from 'src/app/services/moment.service';
import { EditMomentPage } from '../edit-moment/edit-moment.page';
import { NewMomentPage } from '../new-moment/new-moment.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  moments: IMoment[] = [];
  search!: string;

  constructor(private momentService: MomentService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.getMoments();
  }

  private getMoments() {
    this.momentService.getMoments().subscribe(moment => {
      this.moments = moment;
    })
  }

  searchInput(event: any) {

    this.search = event.target.value.trim().toLowerCase();

    if (this.search === '') {
      this.getMoments();
    } else {

      const filtroMoments = this.moments.filter((moment) => {
        return moment.titulo.toLowerCase().includes(this.search);
      });

      if (filtroMoments.length === 0) {
        alert("Nenhum Moment encontrado");
        this.search = '';
      } else {
        this.moments = filtroMoments;
      }
    }
  }

  adicionar() {
    this.modalCtrl.create({
      component: NewMomentPage,
    }).then(modal => {
      modal.present()
      return modal.onDidDismiss();
    }).then(({ data }) => {
      this.momentService.getMoments().subscribe((moments) => {
        this.moments = moments;
      });
    });
  }

  editar(moment: IMoment) {
    this.modalCtrl.create({
      component: EditMomentPage,
      componentProps: { dados: moment }
    }).then(modal => {
      modal.present()
      return modal.onDidDismiss();
    }).then(({ data }) => {
      this.momentService.getMoments().subscribe((moments) => {
        this.moments = moments;
      });
    });
  }

  async excluir(id: any) {

    await this.momentService.read(id);

    if (await confirm("Deseja excluir este Moment?")) {
      this.momentService.delete(id).subscribe(() => {
        this.getMoments();
      });
    };

  }

  cancelar() {
    this.modalCtrl.dismiss()
  }

}
