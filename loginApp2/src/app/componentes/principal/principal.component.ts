import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
})
export class PrincipalComponent implements OnInit {
  usuarioLogueado: Usuario = this.login.getUsuario();

  constructor(private login: LoginService) { }

  ngOnInit() {}

}
