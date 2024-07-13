import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { MomentDTO } from 'src/app/models/moment/moment.dto';
import { MomentService } from 'src/app/services/moment.service';

@Component({
  selector: 'app-moment-form',
  templateUrl: './moment-form.page.html',
  styleUrls: ['./moment-form.page.scss'],
})
export class MomentFormPage implements OnInit {

  rotaAtual!: string;

  modal = false;
  dataAtual = new Date().toISOString();

  titulo!: string;
  data!: string;
  moments: MomentDTO[] = [];

  constructor(
    private router: Router,
    private momentService: MomentService,
    private modalCtrl: ModalController
  ) {

    this.rotaAtual = router.url;

  }

  ngOnInit() { }

  private modalData(isOpen: boolean) {
    this.modal = isOpen;
  }

  selecionarData() {
    this.modalData(true);
  }

  salvarData(): void {

    if (this.data !== null) {
      this.modalData(false);
    }

    const dataFormatada = this.dataAtual.replace(/^(\d{2})(\d{2})(\d{4})$/, '$2/$1/$3');
    this.data = dataFormatada;

  }

  async salvarAdicao(form: NgForm) {

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
    this.data = '';
  }

  cancelar() {
    this.modalCtrl.dismiss();
  }

}