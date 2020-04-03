import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../clases/usuario';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  usuario: Usuario;

  constructor() {
    this.usuario = new Usuario('', '');
  }

  ngOnInit() {}

  enviarDatos(usuario: NgForm) {
    if (usuario.form.invalid) {
      console.log('ERROR');
    } else {
      console.log('SUBMIT OK');
      console.log('ID: ' + usuario.form.controls.id.value);
      console.log('CLAVE: ' + usuario.form.controls.clave.value);
    }
  }
}
