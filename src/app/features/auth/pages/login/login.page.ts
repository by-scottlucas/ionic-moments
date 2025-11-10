import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/shared/services/loading.service';
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
    private loadingService: LoadingService,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {}

  handleLogin() {
    this.authService.login(this.loginForm.value).then(async () =>{
      await this.loadingService.showLoading(500);
      this.router.navigate(['/home'])
    });
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
