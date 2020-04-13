import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../../servicios/login.service';
import { Usuario } from '../../clases/usuario';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Input() usuarioLogueado: Usuario;
  @Output() logoutEvent = new EventEmitter<any>();

  constructor(public login: LoginService) { }

  ngOnInit() {}

  public getDatos(): string {
    const usuario: Usuario = this.login.getUsuario();

    return usuario.email + '(' + usuario.uid + ')';
  }

  public getLogueado(): boolean {
    return this.login.getLogin();
  }

  hacerLogout(): void {
    /*this.login.logout()
      .then( a => {
        this.logoutEvent.emit();
      })
      .catch(error => {
        console.log(error);
      });*/
    this.login.logout()
    .subscribe(() => {
        this.logoutEvent.emit();
    });
  }

}
