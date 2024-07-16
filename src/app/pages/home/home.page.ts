import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { MomentFormPage } from 'src/app/components/moment-form/moment-form.page';
import { UserModalPage } from 'src/app/components/user-modal/user-modal.page';
import { MomentDTO } from 'src/app/models/moment/moment.dto';
import { MomentService } from 'src/app/services/moment.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  usuarioLogado: string = '';

  searchInput!: string;
  moments: MomentDTO[] = [];

  constructor(
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private momentService: MomentService,
  ) {

    this.usuarioLogado = JSON.parse(sessionStorage.getItem('email')!);

  }

  ngOnInit() {
    this.listarMoments();
  }

  abrirModalUsuario() {

    this.modalCtrl.create({
      component: UserModalPage,
    })
      .then(modal => {
        modal.present()
        return modal.onDidDismiss();

      })
      .then(({ data }) => {
        console.log(data);

      });

  }


  async listarMoments() {

    this.momentService.list().subscribe(async response => {

      const responseFilter = response.filter(
        moment => moment.id_usuario.email === this.usuarioLogado
      );

      this.moments = responseFilter;

    })

  }

  searchMoments(event: Event) {

    const inputElement = event.target as HTMLInputElement;
    const termo = inputElement.value;
    this.searchInput = termo;

    this.moments = this.moments.filter(moment =>
      moment.titulo.toLowerCase().includes(this.searchInput.toLowerCase())
    );

    if (this.searchInput === '') {
      this.listarMoments()
    }

  }


  adicionar() {

    this.modalCtrl.create({
      component: MomentFormPage,
      componentProps: {
        tipoFormulario: "adicionar"
      },
      cssClass: 'form-modal'
    })
      .then(modal => {
        modal.present()
        return modal.onDidDismiss();

      })
      .then(({ data }) => {

        console.log(data);

        if (data !== undefined) {
          this.mensagemToast('Moment Adicionado com sucesso!');
          this.listarMoments();
        }

      });

  }


  editar(moment: MomentDTO) {

    this.modalCtrl.create({
      component: MomentFormPage,
      componentProps: {
        dadosEdicao: moment,
        tipoFormulario: 'editar'
      },
      cssClass: 'form-modal'
    })
      .then(modal => {
        modal.present()
        return modal.onDidDismiss();

      })
      .then(({ data }) => {

        console.log(data);

        if (data !== undefined) {
          this.mensagemToast('Moment Atualizado com sucesso!');
          this.listarMoments();
        }

      });

  }


  async excluir(id: any) {

    await this.alertCtrl.create({

      message: 'Deseja excluir este Moment?',
      cssClass: 'alert-modal',
      translucent: true,
      buttons: [
        {
          text: 'Cancelar', role: 'cancel',
          cssClass: 'btn-cancel',
          handler: () => { console.log('Exclusão cancelada') }
        },
        {
          text: 'Confirmar', handler: () => {

            this.momentService.delete(id).subscribe(() => {

              this.listarMoments().then(() => {

                this.mensagemToast('Moment Excluído com sucesso!');

              });

            });

          }
        }
      ],

    }).then(alert => { alert.present() })

  }

  cancelar() {
    this.modalCtrl.dismiss()
  }


  mensagemToast(mensagem: string) {

    this.toastCtrl.create({
      message: mensagem,
      duration: 1000,
      position: 'top',
      cssClass: 'toast-message',

    }).then(toast => { toast.present() })

  }

}
