import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthLoginDTO } from 'src/app/models/auth/auth.login.dto';
import { AuthRegisterDTO } from 'src/app/models/auth/auth.register.dto';
import { UserDTO } from 'src/app/models/user/user.dto';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  rotaAtual!: string;

  nome: string = '';
  email: string = '';
  senha: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastController: ToastController
  ) {

    this.rotaAtual = String(this.router.url)

  }

  ngOnInit() { }


  async entrar(form: NgForm) {

    if (this.email && this.senha) {

      const dados: AuthLoginDTO = form.value;

      try {

        await new Promise<string>((resolve, reject) => {
          this.authService.login(dados).subscribe({
            next: (response) => {
              resolve(response);

              if (response) {
                this.router.navigate(['/home']);
                sessionStorage.setItem('email', JSON.stringify(this.email));
              }
            },
            error: (error) => {
              reject(error);

              console.error('Erro ao fazer login:', error);
            }
          });
        });

      } catch (error) {
        console.error('Erro ao fazer login:', error);

      }

    } else {

      this.mensagemToast("Por Favor Preencha todos os campos!")

    }


  }

  criarConta(form: NgForm) {

    if (this.nome && this.email && this.senha) {

      const dados: AuthRegisterDTO = form.value;

      this.authService.register(dados).subscribe(response => {
        console.log(response);
        this.router.navigate(['login']);
      })

    } else {
      this.mensagemToast("Por Favor Preencha todos os campos!")

    }
  }

  navigateToForm() {
    if (this.rotaAtual === '/login') {
      this.router.navigate(['/cadastro']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  mensagemToast(mensagem: string) {

    this.toastController.create({
      message: mensagem,
      duration: 1000,
      position: 'top',
      cssClass: 'toast-message'
    })
      .then(toast => {
        toast.present()
      });

  }

}
