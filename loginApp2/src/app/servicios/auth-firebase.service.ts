import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Usuario } from '../clases/usuario';
import { Login } from '../clases/login';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthFirebaseService {

  constructor(
    public afAuth: AngularFireAuth // Inject Firebase auth service
  ) { }

  // Sign in with email/password
  public SignIn(login: Login): Observable<void> {
    // from convierte Promise en Observable
    return from(this.afAuth.auth.signInWithEmailAndPassword(login.email, login.clave)
      .then((result) => {
        const usuario: Usuario = new Usuario();
        // this.SetUserData(result.user);
        usuario.uid = result.user.uid;
        usuario.email = result.user.email;
        usuario.displayName = result.user.displayName;
        usuario.photoURL = result.user.photoURL;
        usuario.emailVerified = result.user.emailVerified;

        localStorage.setItem('user', JSON.stringify(usuario));
        localStorage.removeItem('error-login');

        console.log('Login OK');

        /*this.ngZone.run(() => {
          this.router.navigate(['inicio']);
        });*/
      })
      .catch((error) => {
        console.log(error.code);
        localStorage.setItem('error-login', error.code);
      }));
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  /*public SetUserData(user: firebase.User) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: Usuario = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };
    return userRef.set(userData, {
      merge: true
    });

  }*/

  // Sign out
  public SignOut(): Observable<void> {
    return from(this.afAuth.auth.signOut()
    .then(() => {
      localStorage.removeItem('user');
      // this.router.navigate(['login']);
      console.log('Logout OK');
    })
    .catch((error) => {
      console.log(error.code);
    }));
  }

  public getUserData(): Usuario {
    return JSON.parse(localStorage.getItem('user'));
  }

  public getErrorLogin(): string {
    return localStorage.getItem('error-login');
  }

  public isLoggedIn(): boolean {
    return this.afAuth.auth.currentUser !== null;
  }

}
