import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { CircleCheck } from 'lucide-angular';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-forgot-success',
  templateUrl: './forgot-success.page.html',
  styleUrls: ['./forgot-success.page.scss'],
})
export class ForgotSuccessPage {
  readonly icon = CircleCheck;

  constructor(
    private router: Router,
    private loadingService: LoadingService
  ) {}

  async goToLogin() {
    await this.loadingService.showLoading(200)
    this.router.navigate(['/auth/login']);
  }
}
