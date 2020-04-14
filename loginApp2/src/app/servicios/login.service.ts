import { Injectable } from '@angular/core';
import { AuthFirebaseService } from './auth-firebase.service';
import { Usuario } from '../clases/usuario';
import { Login } from '../clases/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private usuarioLogueado: Usuario = new Usuario();

  constructor(private auth: AuthFirebaseService) {
    this.auth.getObsUser()
    .subscribe(usuario => {
      if (usuario) {
        this.usuarioLogueado.displayName = usuario.displayName;
        this.usuarioLogueado.email = usuario.email;
        this.usuarioLogueado.emailVerified = usuario.emailVerified;
        this.usuarioLogueado.photoURL = usuario.photoURL;
        this.usuarioLogueado.uid = usuario.uid;
      }
    });
  }

  public login(login: Login): void {
    this.auth.SignIn(login);
  }

  public logout(): void {

    this.auth.SignOut()
    .then(() => {
      this.usuarioLogueado.displayName = null;
      this.usuarioLogueado.email = null;
      this.usuarioLogueado.emailVerified = null;
      this.usuarioLogueado.photoURL = null;
      this.usuarioLogueado.uid = null;
    });
  }

  public getUsuario(): Usuario {
    // return this.auth.getUserData();
    return this.usuarioLogueado;
  }

  public getError(): string {
    let retorno = '';
    const error: string = this.auth.getErrorLogin();

    if (error != null) {
      retorno = error;
    }

    return retorno;
  }

  public getLogin(): boolean {
    // return (this.getUsuario() != null && this.getUsuario().uid != null);
    return (this.usuarioLogueado.email != null);
  }
}
