import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from '../../servicios/login.service';
import { Usuario } from '../../clases/usuario';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Input() usuarioLogueado: Usuario;

  constructor(public login: LoginService) { }

  ngOnInit() {}

  public getDatos(): string {
    const usuario: Usuario = this.login.getUsuario();

    return usuario.email + '(' + usuario.uid + ')';
  }

  public getLogueado(): boolean {
    return this.login.getLogin();
  }

}
