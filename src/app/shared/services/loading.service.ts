import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  constructor(private loadingCtrl: LoadingController) {}

  async showLoading(
    duration: number = 2000
  ): Promise<void> {
    const loading = await this.loadingCtrl.create({
      duration,
      mode: 'ios',
      cssClass: 'loading',
    });

    await loading.present();
    await loading.onDidDismiss();
  }
}
