import { Injectable } from '@angular/core';
import { AuthFirebaseService } from './auth-firebase.service';
import { Usuario } from '../clases/usuario';
import { Login } from '../clases/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private auth: AuthFirebaseService) { }

  public async login(login: Login): Promise<Usuario> {
    await this.auth.SignIn(login);

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
