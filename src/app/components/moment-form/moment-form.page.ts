import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { MomentDTO } from 'src/app/models/moment/moment.dto';
import { AuthService } from 'src/app/services/auth.service';
import { MomentService } from 'src/app/services/moment.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-moment-form',
  templateUrl: './moment-form.page.html',
  styleUrls: ['./moment-form.page.scss'],
})
export class MomentFormPage implements OnInit {

  @Input() formType: string = '';
  @Input() dadosEdicao!: MomentDTO;

  rotaAtual!: string;
  modalIsOpen = false;

  dataAtual = new Date().toISOString();

  titulo!: string;
  date!: string | Date; // Alterado para string para aceitar o formato YYYY-MM-DD
  id_usuario!: number;

  constructor(
    private router: Router,
    private userService: UserService,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController,
    private momentService: MomentService,
  ) {
    this.rotaAtual = this.router.url;
    this.getUser();
  }

  getUser() {

    const emailUser = sessionStorage.getItem('email');

    if (emailUser) {

      this.userService.list().subscribe(response => {

        const user = response.find(user => emailUser.includes(user.email!));

        if (user) {
          // console.log('Usuário encontrado:', user);
          this.id_usuario = Number(user.id);
        } else {
          console.log('Usuário não encontrado');
        }
      })

    } else {
      console.log('Email não encontrado no sessionStorage');
    }
  }

  ngOnInit() {

    if (this.formType === 'editar') {
      this.titulo = this.dadosEdicao.titulo;
      this.date = this.dadosEdicao.data;
    }

  }

  private modalData(isOpen: boolean) {
    this.modalIsOpen = isOpen;
  }

  selecionarData() {
    this.modalData(true);
  }

  salvarData(): void {

    if (this.dataAtual) {

      this.date = this.dataAtual.slice(0, 10); // Apenas pegando YYYY-MM-DD da data atual em formato ISO
      this.modalData(false);

    } else {
      console.error('Data inválida');
    }
  }

  async salvarAdicao(form: NgForm) {

    if (this.titulo && this.date) {

      const moment: MomentDTO = {
        ...form.value,
        data: this.date,
        id_usuario: Number(this.id_usuario),
      };

      console.log(moment);

      this.momentService.create(moment).subscribe(response => {
        console.log(response);
        this.modalCtrl.dismiss(response);
      }, error => {
        console.error('Erro ao salvar momento:', error);
      });

    } else {

      this.toastCtrl.create({
        message: 'Por favor preencha todos os campos',
        duration: 1000,
        position: 'top',
        cssClass: 'toast-message'

      }).then(toast => { toast.present() })

    }

  }

  async salvarEdicao(form: NgForm) {

    if (this.titulo && this.date) {

      const id = Number(this.dadosEdicao.id)

      const moment: MomentDTO = {
        ...form.value,
        data: this.date,
      };

      console.log(moment);

      this.momentService.update(id, moment).subscribe(response => {
        console.log(response);
        this.modalCtrl.dismiss(response);
      }, error => {
        console.error('Erro ao editar momento:', error);
      });

    } else {

      this.toastCtrl.create({
        message: 'Por favor preencha todos os campos',
        duration: 1000,
        position: 'top',
        cssClass: 'toast-message'

      }).then(toast => { toast.present() })

    }

  }

  cancelar() {
    this.modalCtrl.dismiss();
  }

}
