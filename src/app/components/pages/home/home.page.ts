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

  index: number | null = null
  titulo!: string;
  data!: any;
  moments: IMoment[] = [];

  modal = false;
  modalDate = false;
  dataAtual = new Date().toISOString().replace(/^(\d{2})(\d{2})(\d{4})$/, '$2/$1/$3');

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
      this.momentService.getMoments().subscribe((moments: IMoment[]) => {
        this.moments = moments;
      });
    });
  }

  modalData(open: boolean) {
    this.modalDate = open;
  }

  selecionarData(): void {
    // this.modalData(true);
  }

  salvarData(): void {

    if (this.data !== null) {
      this.modalData(false);
    }

    this.data = this.dataAtual;

  }

  editar(moment: IMoment) {
    this.modalCtrl.create({
      component: EditMomentPage,
      componentProps: moment
    }).then(modal => {
      modal.present()
      return modal.onDidDismiss();
    }).then(({ data }) => {
      this.momentService.getMoments().subscribe((moments) => {
        this.moments = moments;
      });
    });
  }

  // async salvarEdicao(form: NgForm) {

  //   const moment = form.value;

  //   if (this.index !== null && this.titulo && await confirm("Deseja salvar as alterações?")) {
  //     this.momentService.update(this.index, moment);
  //   }

  //   this.modalEdicao(false);

  // }

  async excluir(id: any) {

    await this.momentService.read(id);

    if (await confirm("Deseja excluir o Moment?")) {
      this.momentService.delete(id).subscribe(() => {
        this.getMoments();
      });
    };

  }

  cancelar() {
    this.modalCtrl.dismiss()
  }

}
