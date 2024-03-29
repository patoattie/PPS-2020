import { Injectable } from '@angular/core';
import { AcelerometroService } from './acelerometro.service';
import { Sentido } from '../enums/sentido.enum';
import { SpinnerService } from './spinner.service';
import { LoginService } from './login.service';

import { Flashlight } from '@ionic-native/flashlight/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';

@Injectable({
  providedIn: 'root'
})
export class AlarmaService {
  private eventoAlarma = Sentido[Sentido.INICIAL];
  private audio = new Audio();
  private mensajeAnterior: Sentido;
  private delayLuz = 5000;
  private delayVib = 5000;

  constructor(
    private acelerometro: AcelerometroService,
    private luz: Flashlight,
    private spinner: SpinnerService,
    private vibration: Vibration,
    private login: LoginService
  ) {
    this.audio.loop = true;
    this.mensajeAnterior = Sentido.INICIAL;
  }

  public alarmaActivada(): boolean {
    return this.acelerometro.activo;
  }

  public iniciarAlarma(ms: number, delta: number): void {
    this.acelerometro.eventos
    .subscribe(mensaje => {
      this.eventoAlarma = Sentido[mensaje];

      if (mensaje !== this.mensajeAnterior) {
        this.mensajeAnterior = mensaje;
        this.sonarAlarma(mensaje);
      }
    });

    this.acelerometro.iniciar(ms, delta);
  }

  public pararAlarma(clave: string): void {
    let valido = false;

    switch (this.login.getUsuario().displayName) {
      case 'Admin':
        valido = (clave === '1'.repeat(6));
        break;
      case 'Invitado':
        valido = (clave === '2'.repeat(6));
        break;
      case 'Usuario':
        valido = (clave === '3'.repeat(6));
        break;
      case 'Anonimo':
        valido = (clave === '4'.repeat(6));
        break;
      case 'Tester':
        valido = (clave === '5'.repeat(6));
        break;
    }

    if (valido) {
      this.acelerometro.parar();
      this.audio.pause();
      this.vibration.vibrate(0);
      if (this.luz.isSwitchedOn()) {
        this.luz.switchOff();
      }
    }
  }

  public getX(): number {
    return this.acelerometro.accX;
  }

  public getY(): number {
    return this.acelerometro.accY;
  }

  public getZ(): number {
    return this.acelerometro.accZ;
  }

  public getEventoAlarma(): string {
    return this.eventoAlarma;
  }

  private sonarAlarma(mensaje: Sentido): void {
    const ruta = '../../assets/audios/';

    if (mensaje !== Sentido.INICIAL) {
      if (!this.audio.paused) {
        this.audio.pause();
      }

      switch (mensaje) {
        case Sentido.VERTICAL:
          this.vibration.vibrate(0);
          this.luz.switchOn()
          .then(encendio => {
            if (encendio) {
              this.spinner.delay(this.delayLuz)
              .then(() => this.luz.switchOff());
            }
          });
          break;
        case Sentido.HORIZONTAL:
          if (this.luz.isSwitchedOn()) {
            this.luz.switchOff();
          }
          this.vibration.vibrate(this.delayVib);
          break;
        case (Sentido.IZQUIERDA || Sentido.DERECHA):
          this.vibration.vibrate(0);
          if (this.luz.isSwitchedOn()) {
            this.luz.switchOff();
          }
          break;
        }

      this.audio.src = ruta.concat(Sentido[mensaje].toLowerCase()).concat('.mp3');
      this.audio.load();
      this.audio.play();
    }
  }
}
