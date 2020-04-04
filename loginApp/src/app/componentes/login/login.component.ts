import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Usuario } from '../../clases/usuario';
import { LoginService } from '../../servicios/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  usuario: Usuario;
  formLogin: FormGroup;
  validar: boolean; // Para que se muestren los errores una vez que se intenta enviar el formulario.

  constructor(
      public fb: FormBuilder,
      public login: LoginService
    ) {
    this.usuario = new Usuario('', '');
    this.validar = false;

    this.formLogin = this.fb.group({
      id: ['', Validators.compose([Validators.required, Validators.email])],
      clave: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  ngOnInit() {}

  async enviarDatos(): Promise<void> {
    this.validar = true;

    if (this.formLogin.valid) {
      // console.log('HOLA');
      /*this.login.login(this.usuario).subscribe(
        userLogueado => {
          this.usuario = userLogueado;
        }
      );*/

      this.usuario.id = this.formLogin.controls.id.value;
      this.usuario.clave = this.formLogin.controls.clave.value;

      this.usuario = await this.login.login(this.usuario);
    } else {
      console.log('ERROR');
    }
  }

  limpiarDatos(): void {
    this.validar = false;
    this.formLogin.reset();
  }

  tieneError(control: string): boolean {
    return (this.validar && this.formLogin.controls[control].invalid && this.formLogin.controls[control].dirty);
  }

  puedeEnviar(): boolean {
    return this.formLogin.dirty && !this.login.getLogin();
  }

  loginFallido(): boolean {
    return (this.validar && this.login.getError().length > 0);
  }

}
