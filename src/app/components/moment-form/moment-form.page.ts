import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { MomentDTO } from 'src/app/models/moment/moment.dto';
import { MomentService } from 'src/app/services/moment.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-moment-form',
  templateUrl: './moment-form.page.html',
  styleUrls: ['./moment-form.page.scss'],
})
export class MomentFormPage implements OnInit {

  @Input() tipoFormulario: string = '';
  @Input() dadosEdicao!: MomentDTO;

  rotaAtual!: string;
  modalAberto = false;

  dataAtualISO = new Date().toISOString();

  titulo!: string;
  dataSelecionada!: string | Date;
  idUsuario!: number;

  constructor(
    private router: Router,
    private userService: UserService,
    private toastController: ToastController,
    private modalController: ModalController,
    private momentService: MomentService,
  ) {

    this.rotaAtual = this.router.url;
    this.obterUsuario();

  }

  ngOnInit() {

    if (this.tipoFormulario === 'editar') {
      this.titulo = this.dadosEdicao.titulo;
      this.dataSelecionada = this.dadosEdicao.data;
      
    }
    
  }

  obterUsuario() {
    
    const emailUsuario = sessionStorage.getItem('email');

    if (emailUsuario) {
      
      this.userService.list().subscribe(usuarios => {

        const usuario = usuarios.find(usuario => emailUsuario.includes(usuario.email!));

        if (usuario) {
          this.idUsuario = Number(usuario.id);

        } else {
          console.log('Usuário não encontrado');

        }

      });

    } else {
      console.log('Email não encontrado no sessionStorage');

    }

  }

  private alternarModal(aberto: boolean) {
    this.modalAberto = aberto;

  }

  selecionarData() {
    this.alternarModal(true);

  }

  salvarData(): void {
    
    if (this.dataAtualISO) {
      this.dataSelecionada = this.dataAtualISO.slice(0, 10); // Apenas pegando YYYY-MM-DD da data atual em formato ISO
      this.alternarModal(false);

    } else {
      console.error('Data inválida');
    }

  }

  async salvarAdicao(form: NgForm) {
    
    if (this.titulo && this.dataSelecionada) {
    
      const dadosMoment: MomentDTO = {
        ...form.value,
        data: this.dataSelecionada,
        id_usuario: Number(this.idUsuario),
      };

      this.momentService.create(dadosMoment).subscribe(response => {
        this.modalController.dismiss(response);

      }, error => {
        console.error('Erro ao salvar momento:', error);
        this.mensagemToast('Erro ao salvar momento');

      });
    } else {
      this.mensagemToast('Por favor preencha todos os campos');

    }

  }

  async salvarEdicao(form: NgForm) {

    if (this.titulo && this.dataSelecionada) {
      const id = Number(this.dadosEdicao.id);

      const momento: MomentDTO = {
        ...form.value,
        data: this.dataSelecionada,
      };

      this.momentService.update(id, momento).subscribe(response => {
        this.modalController.dismiss(response);

      }, error => {
        console.error('Erro ao editar momento:', error);
        this.mensagemToast('Erro ao editar momento');
        
      });

    } else {
      this.mensagemToast('Por favor preencha todos os campos');

    }

  }

  cancelar() {
    this.modalController.dismiss();
  }

  mensagemToast(mensagem: string) {
    
    this.toastController.create({
      message: mensagem,
      duration: 1000,
      position: 'top',
      cssClass: 'toast-message'
    }).then(toast => { toast.present() });

  }

}
