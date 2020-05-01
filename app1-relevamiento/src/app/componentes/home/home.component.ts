import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../clases/usuario';
import { LoginService } from '../../servicios/login.service';
import { NavegacionService } from '../../servicios/navegacion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  usuarioLogueado: Usuario = this.login.getUsuario();
  habilitaLogin = true;

  constructor(
    private login: LoginService,
    public navegacion: NavegacionService
  ) { }

  ngOnInit() {}

}
