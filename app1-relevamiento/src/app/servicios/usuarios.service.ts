import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {Usuario} from '../clases/usuario';
// import { LoginService } from './login.service';
import { Perfil } from '../enums/perfil.enum';
import { Imagen } from '../clases/imagen';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private usuarios: Observable<Usuario[]>;
  private usuarioDoc: AngularFirestoreDocument<Usuario>;
  private usuarioCollection: AngularFirestoreCollection<any>;

  constructor(
    private afs: AngularFirestore // ,
    // private login: LoginService
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

  public async getUsuarioLogueado(uid: string): Promise<Usuario> {
    /*this.usuarioDoc = this.afs.doc<Usuario>(`Usuarios/${uid}`);
    return this.usuarioDoc.valueChanges().toPromise();*/

    return this.usuarios.toPromise()
    .then(losUsuarios => losUsuarios.filter(unUsuario => unUsuario.uid === uid)[0]);
  }

  public updateImagenes(usuario: Usuario, imagen: Imagen): Promise<void> {
    const imagenes: Imagen[] = usuario.imagenes ? usuario.imagenes : [];
    const arrayFire = [];

// imagenes.forEach(unaImagen => alert(unaImagen.id));
    imagenes.unshift(imagen);

    usuario.imagenes = imagenes;

    imagenes.forEach(unaImagen => {
      arrayFire.push({
        id: unaImagen.id,
        tipo: unaImagen.tipo,
        url: unaImagen.url,
        usuario: unaImagen.usuario
      });
    });

    return this.usuarioCollection.doc(usuario.uid).update({
      imagenes: arrayFire
    });
  }

  public deleteUsuario(uid: string): Promise<void> {
    return this.usuarioCollection.doc(uid).delete();
  }


  /*public esAdmin(): boolean {
    return this.login.getUsuario().perfil === Perfil.ADMIN;
  }

  public getEmail(): string {
    return  this.login.getUsuario().email;
  }*/
}
