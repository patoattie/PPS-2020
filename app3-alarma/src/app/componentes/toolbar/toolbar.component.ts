import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../../servicios/login.service';
import { Usuario } from '../../clases/usuario';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  usuarioLogueado: Usuario;
  @Output() abrirMenuEvent = new EventEmitter<void>();

  constructor(private login: LoginService) { }

  ngOnInit() {
    this.usuarioLogueado = this.login.getUsuario();
  }

  public getLogueado(): boolean {
    return this.login.getLogin();
  }

  abrirMenu(): void {
    this.abrirMenuEvent.emit();
  }
}
