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
    switch (usuario) {
      case 'admin':
        const datosLogin: Login = new Login();
        datosLogin.email = 'admin@admin.com';
        datosLogin.clave = '111111';

        this.enviarUsuarioEvent.emit(datosLogin);
    }
  }
}
