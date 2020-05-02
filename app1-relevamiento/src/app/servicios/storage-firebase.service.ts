import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { DatePipe } from '@angular/common';
import { LoginService } from './login.service';
import { Usuario } from '../clases/usuario';
import { File } from '@ionic-native/file/ngx';
import { Imagen } from '../clases/imagen';
import { TipoImagen } from '../enums/tipo-imagen.enum';
import { UsuariosService } from './usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class StorageFirebaseService {

  constructor(
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private login: LoginService,
    private file: File,
    private date: DatePipe,
    private usuarios: UsuariosService
  ) { }

  public async subirImagen(imagen: any, tipo: TipoImagen): Promise<void> {
    if (imagen !== undefined) {
      const blobInfo = await this.makeFileIntoBlob(imagen.webviewPath);
      const uploadInfo: any = await this.uploadToFirebase(blobInfo, imagen.name, imagen.fecha, tipo);

      alert('File Upload Success ' + uploadInfo.fileName);
    }
  }

  private makeFileIntoBlob(imagePath) {
    // INSTALL PLUGIN - cordova plugin add cordova-plugin-file
    return new Promise((resolve, reject) => {
      let fileName = '';
      this.file
        .resolveLocalFilesystemUrl(imagePath)
        .then(fileEntry => {
          const { name, nativeURL } = fileEntry;

          // get the path..
          const path = nativeURL.substring(0, nativeURL.lastIndexOf('/'));
          // console.log('path', path);
          // console.log('fileName', name);

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

  uploadToFirebase(imageBlobInfo, nombre: string, fecha: number, tipo: TipoImagen) {
    const usuario: Usuario = this.login.getUsuario();

    return new Promise((resolve, reject) => {
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
            const imageData: Imagen = this.SetImagen(nombre, usuario, tipo, downloadURL);
// alert('2');
            this.SetImagenUsuario(usuario, imageData);
// alert('3');
            // console.log('File available at', downloadURL);
            // this.SetImageData(imageData);
// alert('4');
            // this.SetUserData(usuario);
            this.usuarios.updateImagenes(usuario);
            // .catch(error => alert(error));

            // resolve(uploadTask.task.snapshot);
// alert('6');
          });
        }
      );
    });
  }

  private SetImageData(imagen: Imagen) {
    const imageRef: AngularFirestoreDocument<any> = this.afs.doc(`Imagenes/${imagen.id}`);

    return imageRef.set(imagen, {
      merge: true
    });
  }

  private SetUserData(usuario: Usuario) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`Usuarios/${usuario.uid}`);
    const userData = {
      uid: usuario.uid,
      /*email: usuario.email,
      displayName: usuario.displayName,
      photoURL: usuario.photoURL,
      emailVerified: usuario.emailVerified,
      id: usuario.id,
      perfil: usuario.perfil,
      sexo: usuario.sexo,*/
      // imagenes: JSON.stringify(usuario.imagenes)
      imagenes: usuario.imagenes.map((obj) => Object.assign({}, obj))
    };

    return userRef.set(userData, {
      merge: true
    });
  }

  private SetImagenUsuario(user: Usuario, imagen: Imagen): void {
    const imagenes: Imagen[] = user.imagenes ? user.imagenes : [];
    imagenes.unshift(imagen);

    user.imagenes = imagenes;
  }

  private SetImagen(nombre: string, user: Usuario, tipoImg: TipoImagen, urlImg: string): Imagen {
    const imageData: Imagen = new Imagen();

    imageData.id = nombre;
    imageData.tipo = tipoImg;
    imageData.url = urlImg;
    imageData.usuario = user;

    return imageData;
  }
}
