import { Injectable } from '@angular/core';
import { AuthFirebaseService } from './auth-firebase.service';
import { Usuario } from '../clases/usuario';
import { Login } from '../clases/login';
import { UsuariosService } from './usuarios.service';
// import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private usuarioLogueado: Usuario = new Usuario();

  constructor(
    private auth: AuthFirebaseService,
    private usuarios: UsuariosService
    ) {
    this.auth.getUsuarioRemoto()
    .subscribe(usuario => {
      if (usuario) {
        /*const usuarioStorage: Usuario = this.auth.getUserData();
        this.usuarioLogueado.displayName = usuarioStorage.displayName;
        this.usuarioLogueado.email = usuarioStorage.email;
        this.usuarioLogueado.emailVerified = usuarioStorage.emailVerified;
        this.usuarioLogueado.id = usuarioStorage.id;
        this.usuarioLogueado.perfil = usuarioStorage.perfil;
        this.usuarioLogueado.photoURL = usuarioStorage.photoURL;
        this.usuarioLogueado.sexo = usuarioStorage.sexo;
        this.usuarioLogueado.uid = usuarioStorage.uid;*/

        usuarios.getUsuario(usuario.uid)
        .subscribe(elUsuario => {
          this.usuarioLogueado.displayName = elUsuario.displayName;
          this.usuarioLogueado.email = elUsuario.email;
          this.usuarioLogueado.emailVerified = elUsuario.emailVerified;
          this.usuarioLogueado.id = elUsuario.id;
          this.usuarioLogueado.perfil = elUsuario.perfil;
          this.usuarioLogueado.photoURL = elUsuario.photoURL;
          this.usuarioLogueado.sexo = elUsuario.sexo;
          this.usuarioLogueado.uid = elUsuario.uid;

          localStorage.setItem('user', JSON.stringify(this.usuarioLogueado));
        });
      }
    });
  }

  public login(login: Login): Promise<void> {
    return this.auth.SignIn(login);
  }

  public logout(): Promise<void> {

    return this.auth.SignOut()
    .then(() => {
      this.usuarioLogueado.displayName = null;
      this.usuarioLogueado.email = null;
      this.usuarioLogueado.emailVerified = null;
      this.usuarioLogueado.photoURL = null;
      this.usuarioLogueado.uid = null;
      this.usuarioLogueado.id = null;
      this.usuarioLogueado.perfil = null;
      this.usuarioLogueado.sexo = null;

      localStorage.removeItem('user');
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
    // return (this.usuarioLogueado.email != null);
    return this.auth.isLoggedIn();
  }

  public getUserData(): Usuario {
    return JSON.parse(localStorage.getItem('user'));
  }
}
