import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Imagen } from '../clases/imagen';
import { TipoImagen } from '../enums/tipo-imagen.enum';

@Injectable({
  providedIn: 'root'
})
export class ImagenesService {
  private imagenes: Observable<Imagen[]>;
  private imagenDoc: AngularFirestoreDocument<Imagen>;
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

  public getImagenesPorTipo(tipo: TipoImagen): Observable<Imagen[]> {
    return this.afs.collection<any>('Imagenes', ref => ref.where('tipo', '==', tipo).orderBy('fecha', 'desc')).valueChanges();
  }

  public getImagen(uid: string): Observable<Imagen> {
    this.imagenDoc = this.afs.doc<Imagen>(`Imagenes/${uid}`);
    return this.imagenDoc.valueChanges();
  }

  public addImagen(imagen: Imagen): Promise<DocumentReference> {
    const retorno = this.imagenCollection.add(this.getObject(imagen));
    retorno.then((nuevaImagen => this.updateImagen(nuevaImagen.id, {uid: nuevaImagen.id})));

    return retorno;
  }

  public updateImagen(uid: string, objeto: any): Promise<void> {
    return this.imagenCollection.doc(uid).update(objeto);
  }

  public deleteImagen(uid: string): Promise<void> {
    return this.imagenCollection.doc(uid).delete();
  }

  public getObject(imagen: Imagen): any {
    return {
      id: imagen.id,
      tipo: imagen.tipo,
      url: imagen.url,
      usuario: imagen.usuario,
      uid: imagen.uid,
      fecha: imagen.fecha,
      votos: imagen.votos
    };
  }

  public SetNewImagen(nombre: string, userUid: string, tipoImg: TipoImagen, fechaImg: number, urlImg: string): Imagen {
    const imageData: Imagen = new Imagen();

    imageData.id = nombre;
    imageData.tipo = tipoImg;
    imageData.url = urlImg;
    imageData.usuario = userUid;
    imageData.uid = null;
    imageData.fecha = fechaImg;

    return imageData;
  }
}
