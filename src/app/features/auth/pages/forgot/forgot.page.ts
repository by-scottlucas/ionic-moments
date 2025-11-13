import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChevronLeft } from 'lucide-angular';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { getFormControl } from 'src/app/shared/utils/formUtils';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {
  readonly backIcon = ChevronLeft;
  forgotForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private loadingService: LoadingService,
    private toastService: ToastService
  ) {
    this.forgotForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {}

  async forgetPassword() {
    if (this.forgotForm.invalid) {
      await this.toastService.showToast('Insira um e-mail válido.', 1500);
      return;
    }

    await this.loadingService.showLoading();

    try {
      const email = this.forgotForm.value.email;
      await this.authService.requestPasswordReset(email);
      this.router.navigate(['/auth/forgot/success']);
    } catch (error: any) {
      let message: string;
      switch (error.message) {
        case 'USER_NOT_FOUND':
          message = 'Se o e-mail estiver cadastrado, o link será enviado.';
          break;
        case 'INVALID_EMAIL':
          message = 'E-mail inválido. Verifique o formato.';
          break;
        case 'NETWORK_ERROR':
          message = 'Erro de rede. Tente novamente.';
          break;
        default:
          message = 'Erro ao solicitar recuperação. Tente novamente.';
          break;
      }
      await this.toastService.showToast(message, 3000);
    } finally {
      await this.loadingService.hideLoading();
    }
  }

  async goToLogin() {
    await this.loadingService.showLoading(200);
    this.router.navigate(['/auth/login']);
  }

  getControl(name: string) {
    return getFormControl(this.forgotForm, name);
  }
}
