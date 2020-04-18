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
    this.auth.getUsuarioRemoto()
    .subscribe(usuario => {
      if (usuario) {
        const usuarioStorage: Usuario = this.auth.getUserData();
        this.usuarioLogueado.displayName = usuarioStorage.displayName;
        this.usuarioLogueado.email = usuarioStorage.email;
        this.usuarioLogueado.emailVerified = usuarioStorage.emailVerified;
        this.usuarioLogueado.id = usuarioStorage.id;
        this.usuarioLogueado.perfil = usuarioStorage.perfil;
        this.usuarioLogueado.photoURL = usuarioStorage.photoURL;
        this.usuarioLogueado.sexo = usuarioStorage.sexo;
        this.usuarioLogueado.uid = usuarioStorage.uid;
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
      this.usuarioLogueado.id = null;
      this.usuarioLogueado.perfil = null;
      this.usuarioLogueado.sexo = null;
    });
  }

  public getUsuario(): Usuario {
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
    return (this.usuarioLogueado.email != null);
  }
}
