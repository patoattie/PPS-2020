import { Component } from '@angular/core';
import { Usuario } from '../clases/usuario';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  usuarioLogueado: Usuario = new Usuario();

  constructor() {}

  registrarLogueo(usuario: Usuario) {
    this.usuarioLogueado.displayName = usuario.displayName;
    this.usuarioLogueado.email = usuario.email;
    this.usuarioLogueado.emailVerified = usuario.emailVerified;
    this.usuarioLogueado.photoURL = usuario.photoURL;
    this.usuarioLogueado.uid = usuario.uid;
  }

}
