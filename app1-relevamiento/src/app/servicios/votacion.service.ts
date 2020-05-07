import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UsuariosService } from './usuarios.service';
import { ImagenesService } from './imagenes.service';
import { Voto } from '../clases/voto';
import { Usuario } from '../clases/usuario';
import { Imagen } from '../clases/imagen';
import { TipoImagen } from '../enums/tipo-imagen.enum';

@Injectable({
  providedIn: 'root'
})
export class VotacionService {
  private votos: Observable<Voto[]>;
  private votoDoc: AngularFirestoreDocument<Voto>;
  private votoCollection: AngularFirestoreCollection<any>;

  private listaUsuarios: Usuario[] = [];
  private listaImagenes: Imagen[] = [];

  constructor(
    private usuarios: UsuariosService,
    private imagenes: ImagenesService,
    private afs: AngularFirestore
  ) {
    this.votoCollection = this.afs.collection<any>('Votos');
    this.votos = this.votoCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const uid = a.payload.doc.id;
          return { uid, ...data };
        });
      })
    );

    usuarios.getUsuarios()
    .subscribe(losUsuarios => this.listaUsuarios = losUsuarios);

    imagenes.getImagenes()
    .subscribe(lasImagenes => this.listaImagenes = lasImagenes);
  }


  public getVotos(): Observable<Voto[]> {
    return this.votos;
  }

  public getVotosPorTipo(tipo: TipoImagen): Observable<Voto[]> {
    return this.afs.collection<any>('Votos', ref => ref.where('imagen.tipo', '==', tipo)).valueChanges();
  }

  public getVoto(uid: string): Observable<Voto> {
    this.votoDoc = this.afs.doc<Voto>(`Votos/${uid}`);
    return this.votoDoc.valueChanges();
  }

  public addVoto(voto: Voto): Promise<DocumentReference> {
    const retorno = this.votoCollection.add(this.getObject(voto));
    retorno.then((nuevoVoto => this.updateVoto(nuevoVoto.id, {uid: nuevoVoto.id})));

    return retorno;
  }

  public updateVoto(uid: string, objeto: any): Promise<void> {
    // return this.votoCollection.doc(uid).update(objeto);
    return this.votoCollection.doc(uid).set(objeto, {merge: true});
  }

  public deleteVoto(uid: string): Promise<void> {
    return this.votoCollection.doc(uid).delete();
  }

  public getObject(voto: Voto): any {
    return {
      uid: voto.uid,
      usuario: this.usuarios.getObject(voto.usuario),
      imagen: this.imagenes.getObject(voto.imagen)
    };
  }

  public votar(uidUser: string, uidImg: string, tipo: TipoImagen): void {
    const unUsuario: Usuario = this.getUsuario(uidUser);

    if (unUsuario) {
      if (!this.emitioVotoUsuario(unUsuario, tipo)) {
        const unaImagen: Imagen = this.listaImagenes.find(hayImagen => hayImagen.uid === uidImg);

        if (unaImagen) {
          const nuevoVoto: Voto = new Voto();

          nuevoVoto.usuario = unUsuario;
          nuevoVoto.imagen = unaImagen;

          this.addVoto(nuevoVoto);
          /*if (!unaImagen.votos) {
            unaImagen.votos = [];
          }
          unaImagen.votos.push(uidUser);

          if (!unUsuario.votos) {
            unUsuario.votos = [];
          }
          unUsuario.votos.push(tipo);*/

          // this.imagenes.updateImagen(unaImagen.uid, this.imagenes.getObject(unaImagen));
          // this.usuarios.updateUsuario(unUsuario.uid, this.usuarios.getObject(unUsuario));
          // this.imagenes.updateImagen(unaImagen.uid, {votos: unaImagen.votos});
          // this.usuarios.updateUsuario(unUsuario.uid, {votos: unUsuario.votos});
        }
      }
    }
  }

  private emitioVotoUsuario(usuario: Usuario, tipo: TipoImagen): boolean {
    let retorno = false;

    if (usuario.votos) {
      retorno = usuario.votos.findIndex(elemento => elemento === tipo) > -1;
    }

    return retorno;
  }

  public emitioVoto(uidUser: string, tipo: TipoImagen): boolean {
    let retorno = false;
    const unUsuario: Usuario = this.getUsuario(uidUser);

    if (unUsuario) {
      retorno = this.emitioVotoUsuario(unUsuario, tipo);
    }

    return retorno;
  }

  public imagenVotada(uidUser: string, uidImg: string): boolean {
    let retorno = false;
    const unaImagen: Imagen = this.getImagen(uidImg);

    if (unaImagen) {
      if (unaImagen.votos) {
        retorno = unaImagen.votos.findIndex(elemento => elemento === uidUser) > -1;
      }
    }

    return retorno;
  }

  public cantidadVotos(uidImg: string): number {
    let retorno = 0;
    const unaImagen: Imagen = this.getImagen(uidImg);

    if (unaImagen) {
      if (unaImagen.votos) {
        retorno = unaImagen.votos.length;
      }
    }

    return retorno;
  }

  private getUsuario(uidUser: string): Usuario {
    return this.listaUsuarios.find(hayUsuario => hayUsuario.uid === uidUser);
  }

  private getImagen(uidImg: string): Imagen {
    return this.listaImagenes.find(hayImagen => hayImagen.uid === uidImg);
  }
}
