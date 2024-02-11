import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { IMoment } from 'src/app/models/IMoment';
import { MomentService } from 'src/app/services/moment.service';
import { NewMomentPage } from '../new-moment/new-moment.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  dataAtual = new Date().toISOString();

  index: number | null = null
  titulo!: string;
  data!: string;
  moments: IMoment[] = [];

  modal = false;
  modalDate = false;

  search!: string;

  constructor(private momentService: MomentService, private modalCtrl: ModalController) {
    this.getMoments();
  }

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

  modalEdicao(open: boolean) {
    this.modal = open;
  }

  modalData(open: boolean) {
    this.modalDate = open;
  }

  selecionarData(): void {
    this.modalData(true);
  }

  salvarData(): void {

    const dataFormatada = this.dataAtual.replace(/(\d*)-(\d*)-(\d*).*/, '$3/$2/$1');
    this.data = dataFormatada;


    if (this.data.length !== 0) {
      this.modalData(false);
    }
  }

  editar(moment: IMoment): void {
    this.index = this.moments.indexOf(moment);
    this.titulo = moment.titulo;
    this.data = moment.data;

    this.modalEdicao(true);
  }

  async salvarEdicao() {

    if (this.index !== null && this.titulo && await confirm("Deseja salvar as alterações?")) {
      this.momentService.update(this.index, this.titulo, this.data);
    }

    this.modalEdicao(false);

  }

  async excluir(id: any) {

    await this.momentService.read(id);

    if (await confirm("Deseja excluir o Moment?")) {
      this.momentService.delete(id).subscribe(() => {
        this.getMoments();
      });
    };

  }

  novoMoment() {
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

}
