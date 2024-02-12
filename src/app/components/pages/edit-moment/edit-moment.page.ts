import { Component, Input, OnInit } from '@angular/core';
import { MomentService } from '../../../services/moment.service';
import { IMoment } from '../../../models/IMoment';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';

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
    // if (this.moment) {
    //   console.log("Atualizar")
    //   console.log(this.moment);
    // }

    this.getMoments();
  }

  private getMoments() {
    this.momentService.getMoments().subscribe(moment => {
      this.moments = moment;
    })
  }

  modalData(isOpen: boolean) {
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

    // const momentId: any = this.moments.map(momento => momento.id).reduce((momento) => momento.pop);
    const moment = form.value;

    // console.log(momentId);

    // if (momentId !== null && moment && await confirm("Deseja salvar as alterações?")) {

    //   this.momentService.update(momentId, moment).subscribe(response => {
    //     alert("Moment atualizado com sucesso!");
    //     this.modalCtrl.dismiss(response);
    //   })

    // } else {
    //   alert('Os campos precisam estar preenchidos');
    // }

  }

  cancelar() {
    this.modalCtrl.dismiss();
  }


}
