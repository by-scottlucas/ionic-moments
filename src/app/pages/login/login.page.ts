import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthLoginDTO } from 'src/app/models/auth/auth.login.dto';
import { UserDTO } from 'src/app/models/user/user.dto';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  rotaAtual!: string;

  email: string = '';
  senha: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {

    this.rotaAtual = String(this.router.url)

    // authService.isAuthenticated().subscribe(response => {
      
    //   console.log(response)
    // });

    // authService.logout().subscribe(response => {
    //   console.log(response)
    // })

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
              }
            },
            error: (error) => {
              reject(error);

              console.error('Erro ao fazer login:', error);
            }
          });
        });

        // const response = await this.authService.login(dados).toPromise();
        // if (response) {
        //   this.router.navigate(['/home']);
        // }

      } catch (error) {
        console.error('Erro ao fazer login:', error);
      }
    }
  }



  // async entrar(form: NgForm) {

  //   if (this.email && this.senha) {

  //     const dados: AuthLoginDTO = form.value as AuthLoginDTO;

  //     try {

  //       const accessToken = await new Promise<string>((resolve, reject) => {
  //         this.authService.login(dados).subscribe({
  //           next: (response) => {
  //             resolve(response.accessToken);
  //           },
  //           error: (error) => {
  //             reject(error);
  //           }
  //         });
  //       });

  //       console.log('Access Token:', accessToken);

  //       // Agora você pode fazer a chamada para a rota profile no backend
  //       const response = await fetch("http://localhost:3000/api/v1/auth/profile", {
  //         method: 'POST',
  //         headers: {
  //           'Authorization': `Bearer ${accessToken}`,
  //           'Content-Type': 'application/json'
  //         }
  //       });

  //       if (response.ok) {
  //         const dados = await response.json();
  //         console.log('Dados do perfil:', dados);
  //         // Redirecione para a página desejada após o login bem-sucedido
  //         this.router.navigate(['home']);
  //       } else {
  //         console.error('Erro ao chamar perfil:', response.statusText);
  //       }

  //     } catch (error) {
  //       console.error('Erro ao fazer login:', error);
  //     }
  //   }

  // }


  criarConta(form: NgForm) {
    this.router.navigate(['/login'])
  }

  navigate() {
    if (this.rotaAtual === '/login') {
      this.router.navigate(['/cadastro']);
    } else {
      this.router.navigate(['/login']);
    }
  }

}
