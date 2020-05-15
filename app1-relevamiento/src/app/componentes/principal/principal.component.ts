import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../clases/usuario';
import { LoginService } from '../../servicios/login.service';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NavegacionService } from '../../servicios/navegacion.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
})
export class PrincipalComponent implements OnInit {
  usuarioLogueado: Usuario = this.login.getUsuario();

  constructor(
    private login: LoginService,
    private menu: MenuController,
    private router: Router,
    private navegacion: NavegacionService
  ) { }

  ngOnInit() {}

  abrirMenu() {
    this.menu.open();
  }

  hacerLogout(): void {
    this.menu.close();
    this.login.logout()
    .then(() => {
      this.navegacion.setTitulo('Relevamiento Visual');
      this.router.navigate(['home']);
    });
  }
}
