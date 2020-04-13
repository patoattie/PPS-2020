import { Injectable } from '@angular/core';
import { AuthFirebaseService } from './auth-firebase.service';
import { Usuario } from '../clases/usuario';
import { Login } from '../clases/login';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private auth: AuthFirebaseService) { }

  public login(login: Login): Observable<void> {
    return this.auth.SignIn(login);
  }

  public logout(): Observable<void> {
    return this.auth.SignOut();
  }

  public getUsuario(): Usuario {
    return this.auth.getUserData();
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
