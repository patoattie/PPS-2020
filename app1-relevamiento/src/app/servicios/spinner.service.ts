import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private esperaPorDefecto = 2000;

  constructor(private loadingController: LoadingController) { }

  async cargarEspera(ms?: number) {
    if (!ms) {
      ms = this.esperaPorDefecto;
    }

    const loading = await this.loadingController.create({
      message: 'Espere por favor',
      spinner: 'crescent'
    });
    await loading.present()
    .then(() => this.delay(ms));
  }

  async cargarEsperaId(nombre: string, ms?: number) {
    if (!ms) {
      ms = this.esperaPorDefecto;
    }

    const loading = await this.loadingController.create({
      message: 'Espere por favor',
      spinner: 'crescent',
      duration: ms,
      id: nombre
    });
    await loading.present();
    // .then(() => this.delay(ms));
  }

  async quitarEspera(id?: string) {
    id ? await this.loadingController.dismiss(id) : await this.loadingController.dismiss();
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 5000,
      message: 'Click the backdrop to dismiss early...',
      translucent: true,
      cssClass: 'custom-class custom-loading',
      backdropDismiss: true
    });
    await loading.present();
  }

  private delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms));
  }
}
