import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {Usuario} from '../clases/usuario';
import { Imagen } from '../clases/imagen';
import { ImagenesService } from './imagenes.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private usuarios: Observable<Usuario[]>;
  private usuarioDoc: AngularFirestoreDocument<Usuario>;
  private usuarioCollection: AngularFirestoreCollection<any>;

  constructor(
    private afs: AngularFirestore,
    private imagenes: ImagenesService
  ) {
    this.usuarioCollection = this.afs.collection<any>('Usuarios');
    this.usuarios = this.usuarioCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const uid = a.payload.doc.id;
          return { uid, ...data };
        });
      })
    );
  }

  public getUsuarios(): Observable<Usuario[]> {
    return this.usuarios;
  }

  public getUsuario(uid: string): Observable<Usuario> {
    this.usuarioDoc = this.afs.doc<Usuario>(`Usuarios/${uid}`);
    return this.usuarioDoc.valueChanges();
  }

  public updateImagenes(usuario: Usuario, imagen: Imagen): Promise<void> {
    const imagenes: Imagen[] = usuario.imagenes ? usuario.imagenes : [];
    const arrayFire = [];

    imagenes.unshift(imagen);

    usuario.imagenes = imagenes;

    imagenes.forEach(unaImagen => {
      arrayFire.push(this.imagenes.getObject(unaImagen));
    });

    return this.updateUsuario(usuario.uid, {
      imagenes: arrayFire
    });
  }

  public getObject(usuario: Usuario): any {
    return {
      displayName: usuario.displayName,
      email: usuario.email,
      emailVerified: usuario.emailVerified,
      id: usuario.id,
      imagenes: usuario.imagenes,
      perfil: usuario.perfil,
      photoURL: usuario.photoURL,
      sexo: usuario.sexo,
      uid: usuario.uid,
      votos: usuario.votos
    };
  }

  public updateUsuario(uid: string, objeto: any): Promise<void> {
    // return this.usuarioCollection.doc(uid).update(objeto);
    return this.usuarioCollection.doc(uid).set(objeto, {merge: true});
  }

  public deleteUsuario(uid: string): Promise<void> {
    return this.usuarioCollection.doc(uid).delete();
  }
}
