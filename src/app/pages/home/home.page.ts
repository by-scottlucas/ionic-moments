import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { MomentFormPage } from 'src/app/components/moment-form/moment-form.page';
import { UserModalPage } from 'src/app/components/user-modal/user-modal.page';
import { MomentDTO } from 'src/app/models/moment/moment.dto';
import { AuthService } from 'src/app/services/auth.service';
import { MomentService } from 'src/app/services/moment.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  userLogado: string = '';

  moments: MomentDTO[] = [];
  search!: string;

  constructor(
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private momentService: MomentService,
  ) {

    this.userLogado = JSON.parse(sessionStorage.getItem('email')!);

  }

  ngOnInit() {
    this.listarMoments();
  }

  openModalUser() {
    this.modalCtrl.create({
      component: UserModalPage,
    }).then(modal => {
      modal.present()
      return modal.onDidDismiss();
    }).then(({ data }) => {
      console.log(data);
    });
  }

  async listarMoments() {

    this.momentService.list().subscribe(async response => {

      const responseFilter = response.filter(
        moment => moment.id_usuario.email === this.userLogado
      );

      this.moments = responseFilter;

    })
  }

  // CORRIGIR MÉTODO
  searchMoments(event: Event) {

    const inputElement = event.target as HTMLInputElement;

    const termo = inputElement.value;
    this.search = termo;

    let momentsFiltrados = this.moments;

    momentsFiltrados = momentsFiltrados.filter(moment => {
      moment.titulo.toLowerCase().includes(this.search.toLowerCase());
    });

    this.moments = momentsFiltrados;

  }


  adicionar() {
    this.modalCtrl.create({
      component: MomentFormPage,
      componentProps: { formType: "adicionar" }
    }).then(modal => {
      modal.present()
      return modal.onDidDismiss();
    }).then(({ data }) => {

      console.log(data);
      this.listarMoments();

    });
  }

  editar(moment: MomentDTO) {
    this.modalCtrl.create({
      component: MomentFormPage,
      componentProps: {
        dadosEdicao: moment,
        formType: 'editar'
      }
    }).then(modal => {
      modal.present()
      return modal.onDidDismiss();
    }).then(({ data }) => {

      console.log(data);
      this.listarMoments();

    });
  }

  async excluir(id: any) {

    const alert = await this.alertCtrl.create({

      message: 'Deseja excluir este Moment?',
      cssClass: 'alert-modal',
      translucent: true,
      buttons: [
        {
          text: 'Cancelar', role: 'cancel',
          handler: () => { console.log('Exclusão cancelada') }
        },
        {
          text: 'Confirmar', handler: () => {

            this.momentService.delete(id).subscribe(() => {

              this.listarMoments().then(() => {

                this.toastCtrl.create({
                  message: 'Moment Excluído com sucesso!',
                  duration: 1000,
                  position: 'top',
                  cssClass: 'toast-message'

                }).then(toast => { toast.present() })

              });

            });

          }
        }
      ]
    }).then(alert => { alert.present() })

  }

  cancelar() {
    this.modalCtrl.dismiss()
  }

}
