import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MomentFormPage } from 'src/app/components/moment-form/moment-form.page';
import { MomentDTO } from 'src/app/models/moment/moment.dto';
import { AuthService } from 'src/app/services/auth.service';
import { MomentService } from 'src/app/services/moment.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  moments: MomentDTO[] = [];
  search!: string;

  constructor(
    private authService: AuthService,
    private momentService: MomentService,
    private modalCtrl: ModalController
  ) {

    this.getMoments()

    // authService.isAuthenticated().subscribe(response => {
    //   console.log("Sessão Ativa")
    // });

    // authService.logout().subscribe(response => {
    //   console.log(response)
    // })

  }

  ngOnInit() {}

  async getMoments() {

    this.momentService.list().subscribe(async moment => {
      this.moments = moment;
      console.log(moment)
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
      component: MomentFormPage,
      componentProps: { formType: 'adicionar' }
    }).then(modal => {
      modal.present()
      return modal.onDidDismiss();
    }).then(({ data }) => {
      this.momentService.list().subscribe((moments) => {
        this.moments = moments;
      });
    });
  }

  editar(moment: MomentDTO) {
    this.modalCtrl.create({
      component: MomentFormPage,
      componentProps: { dados: moment, formType: 'editar' }
    }).then(modal => {
      modal.present()
      return modal.onDidDismiss();
    }).then(({ data }) => {
      this.momentService.list().subscribe((moments) => {
        this.moments = moments;
      });
    });
  }

  async excluir(id: any) {

    await this.momentService.read(id);

    if (await confirm("Deseja excluir este Moment?")) {
      this.momentService.delete(id).subscribe(() => {
        this.getMoments();
      });
    };

  }

  cancelar() {
    this.modalCtrl.dismiss()
  }

}
