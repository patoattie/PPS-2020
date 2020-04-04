import { Injectable } from '@angular/core';
import { AuthFirebaseService } from './auth-firebase.service';
import { Usuario } from '../clases/usuario';
// import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private auth: AuthFirebaseService) { }

  public login(usuario: Usuario): Promise<Usuario> {
    this.auth.SignIn(usuario);

    return this.auth.getUserData();
  }

  public logout(): Promise<void> {
    return this.auth.SignOut();
  }

  public getUsuario(): Usuario {
    return JSON.parse(localStorage.getItem('user'));
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
    return (this.getUsuario() != null && this.getUsuario().uid != null);
  }
}
