import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {Credito} from '../clases/credito';
// import {Usuario} from '../clases/usuario';

@Injectable({
  providedIn: 'root'
})
export class CreditosService {
  private creditos: Observable<Credito[]>;
  private creditoDoc: AngularFirestoreDocument<Credito>;
  private creditoCollection: AngularFirestoreCollection<any>;

  constructor(
    private afs: AngularFirestore
  ) {
    this.creditoCollection = this.afs.collection<any>('Creditos');
    this.creditos = this.creditoCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const uid = a.payload.doc.id;
          return { uid, ...data };
        });
      })
    );
  }

  public getCreditos(): Observable<Credito[]> {
    return this.creditos;
  }

  public getCredito(uid: string): Observable<Credito> {
    this.creditoDoc = this.afs.doc<Credito>(`Creditos/${uid}`);
    return this.creditoDoc.valueChanges();
  }

  public getCreditoPorCodigo(codigo: string): Observable<Credito[]> {
    return this.afs.collection<any>('Creditos', ref => ref.where('codigo', '==', codigo)).valueChanges();
  }

  public getObject(credito: Credito): any {
    return {
      uid: credito.uid,
      codigo: credito.codigo,
      importe: credito.importe,
      usuarios: credito.usuarios
    };
  }

  public updateCredito(uid: string, objeto: any): Promise<void> {
    return this.creditoCollection.doc(uid).set(objeto, {merge: true});
  }

  /*public deleteCredito(uid: string): Promise<void> {
    return this.creditoCollection.doc(uid).delete();
  }*/

  public getUnCredito(lista: Credito[], uidCredito: string): Credito {
    return lista.find(unCredito => unCredito.uid === uidCredito);
  }
}