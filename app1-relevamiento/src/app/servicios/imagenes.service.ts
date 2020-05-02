import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Imagen } from '../clases/imagen';

@Injectable({
  providedIn: 'root'
})
export class ImagenesService {
  private imagenes: Observable<Imagen[]>;
  private imagenCollection: AngularFirestoreCollection<any>;

  constructor(
    private afs: AngularFirestore
  ) {
    this.imagenCollection = this.afs.collection<any>('Imagenes');
    this.imagenes = this.imagenCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const uid = a.payload.doc.id;
          return { uid, ...data };
        });
      })
    );
  }

  public getImagenes(): Observable<Imagen[]> {
    return this.imagenes;
  }

  public addImagen(imagen: Imagen): Promise<void | DocumentReference> {
    return this.imagenCollection.add({
      id: imagen.id,
      tipo: imagen.tipo,
      url: imagen.url,
      usuario: imagen.usuario
    });
  }

  public updateImagen(imagen: Imagen): Promise<void> {
    return this.imagenCollection.doc(imagen.id).update({
      id: imagen.id,
      tipo: imagen.tipo,
      url: imagen.url,
      usuario: imagen.usuario
    });
  }

  public deleteImagen(uid: string): Promise<void> {
    return this.imagenCollection.doc(uid).delete();
  }
}
