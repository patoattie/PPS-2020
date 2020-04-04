import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Usuario } from '../clases/usuario';
// import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthFirebaseService {

  constructor(
    public afAuth: AngularFireAuth // Inject Firebase auth service
  ) { }

  // Sign in with email/password
  public SignIn(email: string, clave: string): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, clave)
      .then((result) => {
        const usuario: Usuario = new Usuario();
        // this.SetUserData(result.user);
        usuario.uid = result.user.uid;
        usuario.email = result.user.email;
        usuario.displayName = result.user.displayName;
        usuario.photoURL = result.user.photoURL;
        usuario.emailVerified = result.user.emailVerified;
        // usuario.login = true;

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
      });
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
  // public SignOut(usuario: Usuario) {
  public SignOut() {
    return this.afAuth.auth.signOut()
    .then(() => {
      // usuario.login = false;
      localStorage.removeItem('user');
      // this.router.navigate(['login']);
      console.log('Logout OK');
    })
    .catch((error) => {
      console.log(error.code);
    });
  }

  public getUserData(): Promise<Usuario> {
    return JSON.parse(localStorage.getItem('user'));
  }

  public getErrorLogin(): string {
    return localStorage.getItem('error-login');
  }

  public isLoggedIn(): boolean {
    return this.afAuth.auth.currentUser !== null;
  }

}
