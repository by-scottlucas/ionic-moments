import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MomentFormPage } from 'src/app/components/moment-form/moment-form.page';
import { MomentDTO } from 'src/app/models/moment/moment.dto';
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
    private momentService: MomentService,
    private modalCtrl: ModalController
  ) {

    // const response = await fetch("http://localhost:3000/api/v1/auth/profile", {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${accessToken}`,
    //     'Content-Type': 'application/json'
    //   }
    // });

  }

  ngOnInit() {
    this.getMoments();
  }

  async getMoments() {

    await fetch("http://localhost:3000/api/v1/auth/profile", {
      method: 'POST',
      headers: {
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsIm5hbWUiOiJMdWNhcyBTYW50b3MgU2lsdmEiLCJlbWFpbCI6Imx1Y2FzQGVtYWlsLmNvbSIsImlhdCI6MTcyMDk0MDA3MCwiZXhwIjoxNzIxNTQ0ODcwLCJhdWQiOiJ1c2VycyIsImlzcyI6ImxvZ2luIn0.fu5FiQ_85os7KITUrHQA_hYE32T7HOuYoglaHc8c6v0`,
        'Content-Type': 'application/json'
      }
    });

    this.momentService.read(1).subscribe(async moment => {
      // this.moments = moment;
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
