import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { LoginService } from '../../servicios/login.service';
import { Login } from '../../clases/login';
// import { ToastController } from '@ionic/angular';
import { ToastService } from '../../servicios/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  validar: boolean; // Para que se muestren los errores una vez que se intenta enviar el formulario.

  constructor(
      public fb: FormBuilder,
      private login: LoginService,
      // public toastController: ToastController,
      private mensaje: ToastService
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

      const datosLogin: Login = new Login();
      datosLogin.email = this.formLogin.controls.id.value;
      datosLogin.clave = this.formLogin.controls.clave.value;

      this.login.login(datosLogin)
      .then(async () => {
        if (this.loginFallido()) {
          await this.mensaje.presentToast('Correo electrónico o Clave no válidos');
        }
      });
    } else {
      if (this.formLogin.controls.id.invalid) {
        // this.mostrarMensaje('Debe ingresar un Correo electrónico válido');
        await this.mensaje.presentToast('Debe ingresar un Correo electrónico válido');
      }
      if (this.formLogin.controls.clave.invalid) {
        // this.mostrarMensaje('Debe ingresar una clave válida');
        await this.mensaje.presentToast('Debe ingresar una Clave válida');
      }
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
    return this.formLogin.dirty && !this.getLogueado();
  }

  loginFallido(): boolean {
    return (this.validar && this.login.getError().length > 0);
  }

  completarUsuario(usuario: Login): void {
    this.formLogin.controls.id.setValue(usuario.email);
    this.formLogin.controls.clave.setValue(usuario.clave);
    this.formLogin.markAsDirty(); // Para que habilite el botón de logueo
  }

  public getLogueado(): boolean {
    return this.login.getLogin();
  }

  /*async mostrarMensaje(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      color: 'danger',
      position: 'top',
      duration: 3000,
    });
    await toast.present();
  }*/
}
