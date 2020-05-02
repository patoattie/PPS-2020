import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import {Usuario} from '../clases/usuario';
import { LoginService } from './login.service';
import { Perfil } from '../enums/perfil.enum';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private usuarios: Observable<Usuario[]>;
  private usuarioCollection: AngularFirestoreCollection<any>;

  constructor(
    private afs: AngularFirestore,
    private login: LoginService
  ) {
    this.usuarioCollection = this.afs.collection<any>('Usuarios');
    /*this.usuarios = this.usuarioCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const uid = a.payload.doc.id;
          return { uid, ...data };
        });
      })
    );*/
  }

  public getUsuarios(): Observable<Usuario[]> {
    return this.usuarios;
  }

  public updateImagenes(usuario: Usuario): Promise<void> {
    return this.usuarioCollection.doc(usuario.uid).update({
      imagenes: usuario.imagenes.map((obj) => {
        return Object.assign({}, obj);
      })
    });
  }

  public deleteUsuario(uid: string): Promise<void> {
    return this.usuarioCollection.doc(uid).delete();
  }


  public esAdmin(): boolean {
    return this.login.getUsuario().perfil === Perfil.ADMIN;
  }

  public getEmail(): string {
    return  this.login.getUsuario().email;
  }
}
