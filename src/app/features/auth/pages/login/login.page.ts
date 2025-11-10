import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { getFormControl } from 'src/app/shared/utils/formUtils';

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
    private loadingService: LoadingService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {}

  onSubmit() {
    // To do
  }

  async goToForgot(){
    this.loginForm.reset();
    await this.loadingService.showLoading(200);
    this.router.navigate(['/auth/forgot']);
  }

  async goToRegister(){
    this.loginForm.reset();
    await this.loadingService.showLoading(200);
    this.router.navigate(['/auth/register']);
  }

  getControl(name: string) {
    return getFormControl(this.loginForm, name);
  }
}
