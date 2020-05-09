import { Injectable } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { DeviceMotion, DeviceMotionAccelerationData, DeviceMotionAccelerometerOptions } from '@ionic-native/device-motion/ngx';
import { Subscription, Subject } from 'rxjs';
import { SpinnerService } from './spinner.service';
import { Sentido } from '../enums/sentido.enum';

@Injectable({
  providedIn: 'root'
})
export class AcelerometroService {
  public accX: number;
  public accY: number;
  public accZ: number;
  public activo: boolean;

  private suscripcion: Subscription;
  public eventos: Subject<Sentido>;

  constructor(
    private deviceMotion: DeviceMotion,
    private decPipe: DecimalPipe,
    private spinner: SpinnerService
  ) {
    this.activo = false;
    this.eventos = new Subject();
  }

  public iniciar(ms: number, delta: number): void {
    const optAcc: DeviceMotionAccelerometerOptions = {
      frequency: ms
    };

    this.spinner.delay(ms * 2)
    .then(() => {
      // Watch device acceleration
      this.suscripcion = this.deviceMotion.watchAcceleration(optAcc)
      .subscribe((acceleration: DeviceMotionAccelerationData) => {
        if (this.activo) {
          if (acceleration.x - this.accX > delta) {
            this.eventos.next(Sentido.IZQUIERDA);
          }

          if (acceleration.x - this.accX < -delta) {
            this.eventos.next(Sentido.DERECHA);
          }

          if (acceleration.y - this.accY > delta) {
            this.eventos.next(Sentido.VERTICAL);
          }

          if (acceleration.y - this.accY < -delta) {
            this.eventos.next(Sentido.HORIZONTAL);
          }
        }

        this.accX = acceleration.x;
        this.accY = acceleration.y;
        this.accZ = acceleration.z;

        this.activo = true;
      });
    });
  }

  public parar(): void {
    if (this.activo) {
      this.activo = false;
      this.suscripcion.unsubscribe();
      this.accX = null;
      this.accY = null;
      this.accZ = null;
      this.eventos.next(Sentido.INICIAL);
    }
  }


}
