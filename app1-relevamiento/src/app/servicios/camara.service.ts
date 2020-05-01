import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Foto } from '../clases/foto';

@Injectable({
  providedIn: 'root'
})
export class CamaraService {
    public fotos: Foto[] = [];

  constructor(
    private camera: Camera,
    private webview: WebView
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
        webviewPath: datos
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
}
