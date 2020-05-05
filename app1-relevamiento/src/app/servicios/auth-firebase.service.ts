import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Usuario } from '../clases/usuario';
import { Login } from '../clases/login';
import { Observable } from 'rxjs';
import { Perfil } from '../enums/perfil.enum';
import { Sexo } from '../enums/sexo.enum';
import { Router } from '@angular/router';
import { SpinnerService } from './spinner.service';
import { UsuariosService } from './usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class AuthFirebaseService {

  constructor(
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public afs: AngularFirestore,   // Inject Firestore service
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    public router: Router,
    private spinner: SpinnerService,
    private usuarios: UsuariosService
  ) { }

  // Sign in with email/password
  public SignIn(login: Login): Promise<void> {
    this.spinner.cargarEspera(10000);
    return this.afAuth.auth.signInWithEmailAndPassword(login.email, login.clave)
      .then((result) => {
        // const usuario: Usuario = new Usuario();
        this.SetUserData(result.user);

        /*usuario.uid = result.user.uid;
        usuario.email = result.user.email;
        usuario.displayName = result.user.displayName;
        usuario.photoURL = result.user.photoURL;
        usuario.emailVerified = result.user.emailVerified;

        localStorage.setItem('user', JSON.stringify(usuario));*/
        localStorage.removeItem('error-login');

        console.log('Login OK');

        /*this.ngZone.run(() => {
          this.router.navigate(['principal']);
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
  public SetUserData(user: firebase.User) {
    const hardcodeUsuarios = [
      {id: 1, correo: 'admin@admin.com', perfil: Perfil.ADMIN, sexo: Sexo.FEMENINO},
      {id: 2, correo: 'invitado@invitado.com', perfil: Perfil.INVITADO, sexo: Sexo.FEMENINO},
      {id: 3, correo: 'usuario@usuario.com', perfil: Perfil.USUARIO, sexo: Sexo.MASCULINO},
      {id: 4, correo: 'anonimo@anonimo.com', perfil: Perfil.USUARIO, sexo: Sexo.MASCULINO},
      {id: 5, correo: 'tester@tester.com', perfil: Perfil.TESTER, sexo: Sexo.FEMENINO}
    ];

    const userData: Usuario = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      id: hardcodeUsuarios.filter(unUsuario => unUsuario.correo === user.email)[0].id,
      perfil: hardcodeUsuarios.filter(unUsuario => unUsuario.correo === user.email)[0].perfil,
      sexo: hardcodeUsuarios.filter(unUsuario => unUsuario.correo === user.email)[0].sexo
    };

    this.usuarios.updateUsuario(user.uid, userData)
    .then(() => this.spinner.quitarEspera());

  }

  // Sign out
  public SignOut(): Promise<void> {
    return this.afAuth.auth.signOut()
    .then(() => {
      // this.router.navigate(['home']);
      console.log('Logout OK');
    })
    .catch((error) => {
      console.log(error.code);
    });
  }

  public getErrorLogin(): string {
    return localStorage.getItem('error-login');
  }

  public isLoggedIn(): boolean {
    return this.afAuth.auth.currentUser !== null;
  }

  public getUsuarioRemoto(): Observable<any> {
    return this.afAuth.user;
  }

}
