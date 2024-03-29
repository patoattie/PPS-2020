import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { DatePipe } from '@angular/common';
import { LoginService } from './login.service';
import { Usuario } from '../clases/usuario';
import { File } from '@ionic-native/file/ngx';
import { Imagen } from '../clases/imagen';
import { TipoImagen } from '../enums/tipo-imagen.enum';
import { UsuariosService } from './usuarios.service';
import { ImagenesService } from './imagenes.service';
import { SpinnerService } from './spinner.service';

@Injectable({
  providedIn: 'root'
})
export class StorageFirebaseService {

  constructor(
    private storage: AngularFireStorage,
    private login: LoginService,
    private file: File,
    private date: DatePipe,
    private usuarios: UsuariosService,
    private imagenes: ImagenesService,
    private spinner: SpinnerService
  ) { }

  public async subirImagen(imagen: any, tipo: TipoImagen): Promise<void> {
    if (imagen !== undefined) {
      this.spinner.cargarEsperaId(imagen.name, 10000);
      const blobInfo = await this.makeFileIntoBlob(imagen.webviewPath, imagen.name);
      const uploadInfo: any = await this.uploadToFirebase(blobInfo, imagen.name, imagen.fecha, tipo);
      this.spinner.quitarEspera(imagen.name);

      alert('File Upload Success ' + uploadInfo.fileName);
    }
  }

  private makeFileIntoBlob(imagePath: string, fileName: string) {
    return new Promise((resolve, reject) => {
      // let fileName = '';
      this.file
        .resolveLocalFilesystemUrl(imagePath)
        .then(fileEntry => {
          const { name, nativeURL } = fileEntry;

          // get the path..
          const path = nativeURL.substring(0, nativeURL.lastIndexOf('/'));

          fileName = name;

          // we are provided the name, so now read the file into
          // a buffer
          return this.file.readAsArrayBuffer(path, name);
        })
        .then(buffer => {
          // get the buffer and make a blob to be saved
          const imgBlob = new Blob([buffer], {
            type: 'image/jpeg'
          });
          resolve({
            fileName,
            imgBlob
          });
        })
        .catch(e => reject(e));
    });
  }

  async uploadToFirebase(imageBlobInfo, nombre: string, fecha: number, tipo: TipoImagen) {
    // const usuario: Usuario = await this.usuarios.getUsuarioLogueado(this.login.getUsuario().uid);
    // const usuario: Usuario = this.usuarioLogueado;
    // usuario.imagenes.forEach(unaImagen => alert(unaImagen.id));

    return new Promise((resolve, reject) => {
      const usuario: Usuario = this.login.getUsuario();
      const fileRef = this.storage.ref('images/' + nombre);
      const metadata = {
        contentType: 'image/jpeg',
        customMetadata: {
          usuario: usuario.email,
          id: usuario.uid,
          fecha: this.date.transform(fecha, 'dd/MM/yyyy HH:mm:ss')
        }
      };

      const uploadTask = fileRef.put(imageBlobInfo.imgBlob, metadata);

      uploadTask.task.on(
        'state_changed',
        (snapshot: any) => {
          /*console.log(
            'snapshot progess ' +
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );*/
        },
        error => {
          console.log(error);
          reject(error);
        },
        () => {
          // completion...
          uploadTask.task.snapshot.ref.getDownloadURL()
          .then((downloadURL) => {
            const imageData: Imagen = this.imagenes.SetNewImagen(nombre, usuario.uid, tipo, fecha, downloadURL);

            this.imagenes.addImagen(imageData)
            .then((nuevaImagen) => {
              imageData.uid = nuevaImagen.id;
              this.usuarios.updateImagenes(usuario, imageData)
              .then(() => resolve(uploadTask.task.snapshot));
            });
          });
        }
      );
    });
  }
}
