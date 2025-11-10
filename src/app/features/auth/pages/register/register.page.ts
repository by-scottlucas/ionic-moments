import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { getFormControl } from 'src/app/shared/utils/formUtils';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService,
    private loadingService: LoadingService
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {}

  async registerUser() {
    if (this.registerForm.invalid) return;

    try {
      await this.loadingService.showLoading();
      await this.authService.register(this.registerForm.value);

      await this.toastService.showToast('Conta criada com sucesso!', 1000);
      this.router.navigate(['/auth/login']);
    } catch (error: any) {
      let message: string;

      switch (error.message) {
        case 'EMAIL_ALREADY_EXISTS':
          message = 'Este e-mail já está cadastrado.';
          break;
        case 'WEAK_PASSWORD':
          message = 'A senha é muito fraca, tente uma mais segura.';
          break;
        case 'NETWORK_ERROR':
          message = 'Falha de conexão, verifique sua internet.';
          break;
        case 'INVALID_EMAIL':
          message = 'O formato do e-mail é inválido.';
          break;
        default:
          message = 'Erro ao criar a conta, tente novamente mais tarde.';
          break;
      }

      await this.toastService.showToast(message, 1500);
    } finally {
      await this.loadingService.hideLoading();
    }
  }

  async goToLogin() {
    this.registerForm.reset();
    await this.loadingService.showLoading(200);
    this.router.navigate(['/auth/login']);
  }

  getControl(name: string) {
    return getFormControl(this.registerForm, name);
  }
}
