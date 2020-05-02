import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Foto } from '../clases/foto';
import { StorageFirebaseService } from './storage-firebase.service';

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
        // base64: 'data:image/jpeg;base64,' + this.webview.convertFileSrc(datos),
        // name: datos.replace(/^.*[\\\/]/, '')
        // name: Math.round(new Date().getTime() / 1000).toString().concat('.jpg'),
        name: this.date.transform(Date.now(), 'yyyyMMddHHmmSSS').concat('.jpg')
        // nameTemp: datos.replace(/^.*[\\\/]/, '')
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  public limpiarFotos(): void {
    /*this.camera.cleanup()
    .catch(error => alert(error));*/
    this.fotos.splice(0, this.fotos.length);
  }

  public async subirFoto(foto: any): Promise<void> {
    await this.storage.subirImagen(foto);
  }
}
