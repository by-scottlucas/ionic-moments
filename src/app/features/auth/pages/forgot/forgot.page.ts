import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ChevronLeft } from 'lucide-angular';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { getFormControl } from 'src/app/shared/utils/formUtils';

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
    private loadingService: LoadingService
  ) {
    this.forgotForm = this.formBuilder.group({
      email: ['', Validators.required],
    });
  }

  ngOnInit() {}

  async onSubmit() {
    if (this.forgotForm.invalid) return;
    await this.loadingService.showLoading(200);
    this.router.navigate(['/auth/forgot/success']);
  }

  async goToLogin() {
    await this.loadingService.showLoading(200);
    this.router.navigate(['/auth/login']);
  }

  getControl(name: string) {
    return getFormControl(this.forgotForm, name);
  }
}
