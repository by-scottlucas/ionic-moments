import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  rotaAtual!: string;

  constructor(
    private router: Router
  ) {

    this.rotaAtual = String(this.router.url)

  }

  ngOnInit() { }


  entrar() {
    this.router.navigate(['/home'])
  }

  criarConta() {
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
