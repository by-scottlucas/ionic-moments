import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MomentFormPage } from 'src/app/components/moment-form/moment-form.page';
import { UserModalComponent } from 'src/app/components/user-modal/user-modal.component';
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
    private authService: AuthService,
    private momentService: MomentService,
    private modalCtrl: ModalController
  ) {

    this.listarMoments();

    this.userLogado = JSON.parse(sessionStorage.getItem('email')!);

  }

  ngOnInit() { }

  openModalUser() {
    this.modalCtrl.create({
      component: UserModalComponent,
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

  searchInput(event: any) {

    this.search = event.target.value.trim().toLowerCase();

    if (this.search === '') {
      this.listarMoments();
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
        dados: moment,
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

    await this.momentService.read(id);

    if (await confirm("Deseja excluir este Moment?")) {
      this.momentService.delete(id).subscribe(() => {
        this.listarMoments();
      });
    };

  }

  cancelar() {
    this.modalCtrl.dismiss()
  }

}
