import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { IMoment } from '../../../models/IMoment';
import { MomentService } from '../../../services/moment.service';

@Component({
  selector: 'app-edit-moment',
  templateUrl: './edit-moment.page.html',
  styleUrls: ['./edit-moment.page.scss'],
})
export class EditMomentPage implements OnInit {

  @Input()
  dados!: IMoment;

  titulo!: string;
  data!: string;
  moments: IMoment[] = [];

  modalDate = false;
  dataAtual = new Date().toISOString().replace(/^(\d{2})(\d{2})(\d{4})$/, '$2/$1/$3');

  constructor(private momentService: MomentService, private modalCtrl: ModalController) {
  }

  ngOnInit() {

    this.titulo = this.dados.titulo;
    this.data = this.dados.data;

    this.getMoments();

  }

  private getMoments() {
    this.momentService.getMoments().subscribe(moment => {
      this.moments = moment;
    })
  }

  private modalData(isOpen: boolean) {
    this.modalDate = isOpen;
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

  async salvarEdicao(form: NgForm) {

    const id: number = this.dados.id;
    const moment = form.value;

    if (id !== null && moment && await confirm("Deseja salvar as alterações?")) {

      this.momentService.update(id, moment).subscribe(response => {
        alert("Moment atualizado com sucesso!");
        this.modalCtrl.dismiss(response);
      })

    } else {
      alert('Os campos precisam estar preenchidos');
    }

  }

  cancelar() {
    this.modalCtrl.dismiss();
  }


}
