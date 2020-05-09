import { Injectable } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { DeviceMotion, DeviceMotionAccelerationData, DeviceMotionAccelerometerOptions } from '@ionic-native/device-motion/ngx';
import { Subscription } from 'rxjs';
import { SpinnerService } from './spinner.service';

@Injectable({
  providedIn: 'root'
})
export class AcelerometroService {
  public accX: string;
  public accY: string;
  public accZ: string;
  public activo: boolean;

  private suscripcion: Subscription;

  constructor(
    private deviceMotion: DeviceMotion,
    private decPipe: DecimalPipe,
    private spinner: SpinnerService
    ) {
      this.activo = false;
    }

  public iniciar(ms: number): void {
    const optAcc: DeviceMotionAccelerometerOptions = {
      frequency: ms
    };

    this.spinner.delay(ms * 2)
    .then(() => {
      this.activo = true;
      // Watch device acceleration
      this.suscripcion = this.deviceMotion.watchAcceleration(optAcc)
      .subscribe((acceleration: DeviceMotionAccelerationData) => {
        // console.log(acceleration);
        this.accX = this.decPipe.transform(acceleration.x, '1.0-0');
        this.accY = this.decPipe.transform(acceleration.y, '1.0-0');
        this.accZ = this.decPipe.transform(acceleration.z, '1.0-0');
      });
    });
  }

  public parar(): void {
    if (this.activo) {
      this.activo = false;
      this.suscripcion.unsubscribe();
      this.accX = '';
      this.accY = '';
      this.accZ = '';
    }
  }
}
