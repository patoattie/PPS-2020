import { Component, OnInit } from '@angular/core';
import { Usuario } from '../clases/usuario';
import { LoginService } from '../servicios/login.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {
  usuarioLogueado: Usuario = this.login.getUsuario();

  constructor(private login: LoginService) { }

  ngOnInit() {
  }

}
