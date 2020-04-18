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
}
