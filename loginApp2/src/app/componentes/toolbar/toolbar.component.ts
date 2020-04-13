import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../../servicios/login.service';
import { Usuario } from '../../clases/usuario';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  /*@Input()*/ usuarioLogueado: Usuario = new Usuario();
  @Output() logoutEvent = new EventEmitter<any>();

  constructor(public login: LoginService) { }

  ngOnInit() {
    this.login.getObsUsuario()
    .subscribe(usuario => {
      if (usuario) {
        this.usuarioLogueado.displayName = usuario.displayName;
        this.usuarioLogueado.email = usuario.email;
        this.usuarioLogueado.emailVerified = usuario.emailVerified;
        this.usuarioLogueado.photoURL = usuario.photoURL;
        this.usuarioLogueado.uid = usuario.uid;
      } else {
        this.usuarioLogueado.displayName = null;
        this.usuarioLogueado.email = null;
        this.usuarioLogueado.emailVerified = null;
        this.usuarioLogueado.photoURL = null;
        this.usuarioLogueado.uid = null;
      }
    });
  }

  public getDatos(): string {
    const usuario: Usuario = this.login.getUsuario();

    return usuario.email + '(' + usuario.uid + ')';
  }

  public getLogueado(): boolean {
    return this.login.getLogin();
  }

  hacerLogout(): void {
    this.login.logout()
    .subscribe(() => {
        this.logoutEvent.emit();
    });
  }

}
