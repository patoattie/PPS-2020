import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { LoginService } from 'src/app/servicios/login.service';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

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
    private router: Router
  ) { }

  ngOnInit() {}

  abrirMenu() {
    this.menu.open();
  }

  hacerLogout(): void {
    this.menu.close();
    this.login.logout()
    .then(() => this.router.navigate(['home']));
  }
}
