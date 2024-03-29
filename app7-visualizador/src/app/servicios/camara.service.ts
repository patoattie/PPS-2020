import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Foto } from '../clases/foto';
import { StorageFirebaseService } from './storage-firebase.service';
import { TipoImagen } from '../enums/tipo-imagen.enum';

@Injectable({
  providedIn: 'root'
})
export class CamaraService {
    public fotos: Foto[] = [];

  constructor(
    private camera: Camera,
    private webview: WebView,
    private storage: StorageFirebaseService,
    private date: DatePipe
  ) { }

  private getOpciones(): CameraOptions {
    return {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    };
  }

  public tomarFoto(): void {
    this.camera.getPicture(this.getOpciones())
    .then(datos => {
      this.fotos.unshift({
        filepath: this.webview.convertFileSrc(datos),
        webviewPath: datos,
        fecha: Date.now(),
        name: this.date.transform(Date.now(), 'yyyyMMddHHmmSSS').concat('.jpg')
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  public limpiarFotos(): void {
    this.camera.cleanup();
    this.fotos.splice(0, this.fotos.length);
  }

  public async subirFotos(tipo: TipoImagen): Promise<void> {
    this.fotos.forEach(async foto => await this.storage.subirImagen(foto, tipo));
  }

  public getCantidad(): number {
    return this.fotos.length;
  }
}
