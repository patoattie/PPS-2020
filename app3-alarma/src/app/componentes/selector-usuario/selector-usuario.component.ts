import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Login } from '../../clases/login';

@Component({
  selector: 'app-selector-usuario',
  templateUrl: './selector-usuario.component.html',
  styleUrls: ['./selector-usuario.component.scss'],
})
export class SelectorUsuarioComponent implements OnInit {
  @Output() enviarUsuarioEvent = new EventEmitter<Login>();
  @Input() deshabilitaControl: boolean;

  constructor() { }

  ngOnInit() {}

  enviarUsuario(usuario: string): void {
    const datosLogin: Login = new Login();

    switch (usuario) {
      case 'admin':
        datosLogin.email = 'admin@admin.com';
        datosLogin.clave = '111111';
        break;

      case 'invitado':
        datosLogin.email = 'invitado@invitado.com';
        datosLogin.clave = '222222';
        break;

      case 'usuario':
        datosLogin.email = 'usuario@usuario.com';
        datosLogin.clave = '333333';
        break;

      case 'anonimo':
        datosLogin.email = 'anonimo@anonimo.com';
        datosLogin.clave = '444444';
        break;

      case 'tester':
        datosLogin.email = 'tester@tester.com';
        datosLogin.clave = '555555';
        break;
    }

    this.enviarUsuarioEvent.emit(datosLogin);
  }

}
