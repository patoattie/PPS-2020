import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Usuario } from '../../clases/usuario';
import { LoginService } from '../../servicios/login.service';
import { Login } from '../../clases/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  validar: boolean; // Para que se muestren los errores una vez que se intenta enviar el formulario.
  @Output() loginEvent = new EventEmitter<Usuario>();
  @Input() habilitaLogin: boolean; // Si ya está logueado el usuario inhabilita los botones de ingresar y limpiar.

  constructor(
      public fb: FormBuilder,
      public login: LoginService
    ) {
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
      let usuario: Usuario = new Usuario();

      const datosLogin: Login = new Login();
      datosLogin.email = this.formLogin.controls.id.value;
      datosLogin.clave = this.formLogin.controls.clave.value;

      usuario = await this.login.login(datosLogin);

      if (!this.loginFallido()) {
        this.loginEvent.emit(usuario);
      }
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
    return this.formLogin.dirty && this.habilitaLogin;
  }

  loginFallido(): boolean {
    return (this.validar && this.login.getError().length > 0);
  }

  completarUsuario(usuario: Login): void {
    this.formLogin.controls.id.setValue(usuario.email);
    this.formLogin.controls.clave.setValue(usuario.clave);
    this.formLogin.markAsDirty(); // Para que habilite el botón de logueo
  }

}
