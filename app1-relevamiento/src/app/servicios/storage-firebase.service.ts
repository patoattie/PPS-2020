import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase/app';
import { LoginService } from './login.service';
import { Usuario } from '../clases/usuario';
import { File } from '@ionic-native/file/ngx';

@Injectable({
  providedIn: 'root'
})
export class StorageFirebaseService {

  constructor(
    private storage: AngularFireStorage,
    private login: LoginService,
    private file: File
  ) { }

  public async subirImagen(imagen: any): Promise<void> {
    if (imagen !== undefined) {
      const blobInfo = await this.makeFileIntoBlob(imagen.webviewPath);
      const uploadInfo: any = await this.uploadToFirebase(blobInfo, imagen.name);

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

  uploadToFirebase(imageBlobInfo, nombre: string) {
    const usuario: Usuario = this.login.getUsuario();

    return new Promise((resolve, reject) => {
      const fileRef = this.storage.ref('images/' + nombre);
      const metadata = {
        contentType: 'image/jpeg',
        customMetadata: {
          usuario: usuario.email,
          id: usuario.uid
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
          resolve(uploadTask.task.snapshot);
        }
      );
    });
  }}
