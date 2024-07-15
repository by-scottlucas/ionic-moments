import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
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

  rotaAtual!: string;
  modalIsOpen = false;

  dataAtual = new Date().toISOString();

  titulo!: string;
  date!: string; // Alterado para string para aceitar o formato YYYY-MM-DD
  id_usuario!: number;

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private momentService: MomentService,
    private modalCtrl: ModalController
  ) {
    this.rotaAtual = router.url;
    this.getUser();
  }

  getUser() {
    const emailUser = sessionStorage.getItem('email');

    if (emailUser) {
      this.userService.list().subscribe(response => {
        const user = response.find(user => emailUser.includes(user.email!));

        if (user) {
          console.log('Usuário encontrado:', user);
          this.id_usuario = Number(user.id);
        } else {
          console.log('Usuário não encontrado');
        }
      }, error => {
        console.error('Erro ao buscar usuários:', error);
      });
    } else {
      console.log('Email não encontrado no sessionStorage');
    }
  }

  ngOnInit() {
    console.log("Tipo de Formulário:", this.formType);
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
      console.log(this.date); // Saída: "2024-07-15"

      this.modalData(false);
    } else {
      console.error('Data inválida');
    }
  }

  async salvarAdicao(form: NgForm) {
    if (this.titulo && this.date) {
      const moment: MomentDTO = {
        ...form.value,
        id_usuario: Number(this.id_usuario),
      };

      console.log(moment);

      this.momentService.create(moment).subscribe(response => {
        console.log(response);
        // Limpar inputs ou outra lógica após salvar
      }, error => {
        console.error('Erro ao salvar momento:', error);
      });
    } else {
      alert('Por favor preencha todos os campos');
    }
  }

  cancelar() {
    this.modalCtrl.dismiss();
  }

}
