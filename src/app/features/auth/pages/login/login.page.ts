import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { getFormControl } from 'src/app/shared/utils/formUtils';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService,
    private loadingService: LoadingService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {}

  async handleLogin() {
    if (this.loginForm.invalid) return;

    try {
      await this.loadingService.showLoading();
      await this.authService.login(this.loginForm.value);
      this.router.navigate(['/home']);
    } catch (error: any) {
      let message: string;

      switch (error.message) {
        case 'INVALID_CREDENTIALS':
          message = 'E-mail e/ou senha incorretos.';
          break;
        case 'USER_DISABLED':
          message = 'Sua conta foi desativada.';
          break;
        case 'NETWORK_ERROR':
          message = 'Falha de conexão, verifique sua internet.';
          break;
        default:
          message = 'Erro desconhecido. Tente novamente mais tarde.';
          break;
      }

      await this.toastService.showToast(message, 1500);
    } finally {
      await this.loadingService.hideLoading();
    }
  }

  async goToForgot() {
    this.loginForm.reset();
    await this.loadingService.showLoading(200);
    this.router.navigate(['/auth/forgot']);
  }

  async goToRegister() {
    this.loginForm.reset();
    await this.loadingService.showLoading(200);
    this.router.navigate(['/auth/register']);
  }

  getControl(name: string) {
    return getFormControl(this.loginForm, name);
  }
}
