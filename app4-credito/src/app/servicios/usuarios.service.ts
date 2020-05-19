import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {Usuario} from '../clases/usuario';
import {Credito} from '../clases/credito';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private usuarios: Observable<Usuario[]>;
  private usuarioDoc: AngularFirestoreDocument<Usuario>;
  private usuarioCollection: AngularFirestoreCollection<any>;

  constructor(
    private afs: AngularFirestore
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

  public getCreditos(uid: string): Observable<Credito> {
    return this.afs.doc<Credito>(`Usuarios/${uid}/creditos`).valueChanges();
  }

  public getObject(usuario: Usuario): any {
    return {
      displayName: usuario.displayName,
      email: usuario.email,
      emailVerified: usuario.emailVerified,
      id: usuario.id,
      perfil: usuario.perfil,
      photoURL: usuario.photoURL,
      sexo: usuario.sexo,
      uid: usuario.uid,
      creditos: usuario.creditos,
      saldo: usuario.saldo
    };
  }

  public updateUsuario(uid: string, objeto: any): Promise<void> {
    return this.usuarioCollection.doc(uid).set(objeto, {merge: true});
  }

  public deleteUsuario(uid: string): Promise<void> {
    return this.usuarioCollection.doc(uid).delete();
  }

  public getUnUsuario(lista: Usuario[], uidUser: string): Usuario {
    return lista.find(unUsuario => unUsuario.uid === uidUser);
  }
}
