import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { IMoment } from 'src/app/models/IMoment';
import { MomentService } from 'src/app/services/moment.service';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.page.html',
  styleUrls: ['./new-moment.page.scss'],
})
export class NewMomentPage implements OnInit {

  titulo!: string;
  data!: any;
  moments: IMoment[] = [];

  modal = false;
  dataAtual = new Date().toISOString().replace(/^(\d{2})(\d{2})(\d{4})$/, '$2/$1/$3');

  constructor(private momentService: MomentService, private modalCtrl: ModalController) {
  }

  ngOnInit() { }

  async modalData(isOpen: boolean) {
    this.modal = isOpen;
  }

  selecionarData() {
    this.modalData(true);
  }

  salvarData(): void {

    if (this.data !== null) {
      this.modalData(false);
    }

    this.data = this.dataAtual;

  }

  async adicionar(form: NgForm) {

    if (this.titulo && this.data) {

      const moment = form.value;

      this.momentService.create(moment).subscribe(response => {
        this.limparInputs();
        alert('Moment registrado com sucesso!');
        this.modalCtrl.dismiss(response);
      })

    } else {
      alert('Por favor preencha todos os campos');
    }

  }

  private limparInputs() {
    this.titulo = '';
    this.data = 'dd/mm/aaaa';
  }

  cancelar() {
    this.modalCtrl.dismiss();
  }

}