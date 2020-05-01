import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Foto } from '../clases/foto';

@Injectable({
  providedIn: 'root'
})
export class CamaraService {
    public fotos: Foto[] = [];

  constructor(private camera: Camera) { }

  private getOpciones(): CameraOptions {
    return {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
  }

  public tomarFoto(): void {
    this.camera.getPicture(this.getOpciones())
    .then(datos => {
      this.fotos.unshift({
        filepath: '...',
        webviewPath: datos
      });
    })
    .catch(error => {
      console.log(error);
    });
  }
}
