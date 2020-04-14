import { Component } from '@angular/core';
import { Usuario } from '../clases/usuario';
import { LoginService } from '../servicios/login.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  usuarioLogueado: Usuario = this.login.getUsuario();
  habilitaLogin = true;

  constructor(private login: LoginService) {}

  registrarLogueo(usuario: Usuario) {
    this.usuarioLogueado.displayName = usuario.displayName;
    this.usuarioLogueado.email = usuario.email;
    this.usuarioLogueado.emailVerified = usuario.emailVerified;
    this.usuarioLogueado.photoURL = usuario.photoURL;
    this.usuarioLogueado.uid = usuario.uid;
    this.habilitaLogin = false;
  }

  registrarDeslogueo(): void {
    this.usuarioLogueado.displayName = null;
    this.usuarioLogueado.email = null;
    this.usuarioLogueado.emailVerified = null;
    this.usuarioLogueado.photoURL = null;
    this.usuarioLogueado.uid = null;
    this.habilitaLogin = true;
  }

}
