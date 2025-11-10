import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loading?: HTMLIonLoadingElement;

  constructor(private loadingCtrl: LoadingController) {}

  /**
   * Exibe o loading.
   * @param duration Tempo opcional (ms). Se não for definido, o loading ficará ativo até que hideLoading seja chamado.
   * @param message Mensagem opcional.
   */
  async showLoading(duration?: number): Promise<void> {
    // Se já houver um loading ativo, ignora
    if (this.loading) return;

    this.loading = await this.loadingCtrl.create({
      duration,
      mode: 'ios',
      cssClass: 'loading',
    });

    await this.loading.present();

    // Se tiver duração, limpa automaticamente a referência depois de fechar
    if (duration) {
      await this.loading.onDidDismiss();
      this.loading = undefined;
    }
  }

  /**
   * Oculta o loading manualmente.
   */
  async hideLoading(): Promise<void> {
    if (this.loading) {
      await this.loading.dismiss();
      this.loading = undefined;
    }
  }
}
