import { Injectable } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { DeviceMotion, DeviceMotionAccelerationData, DeviceMotionAccelerometerOptions } from '@ionic-native/device-motion/ngx';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AcelerometroService {
  public accX: string;
  public accY: string;
  public accZ: string;

  private finalizar: Subject<boolean> = new Subject();
  private acelera: any;

  constructor(
    private deviceMotion: DeviceMotion,
    private decPipe: DecimalPipe
    ) { }

  public iniciar(ms: number): void {
    const optAcc: DeviceMotionAccelerometerOptions = {
      frequency: ms
    };

    // Watch device acceleration
    this.deviceMotion.watchAcceleration(optAcc)
    .pipe(takeUntil(this.finalizar))
    .subscribe((acceleration: DeviceMotionAccelerationData) => {
      // console.log(acceleration);
      this.accX = this.decPipe.transform(acceleration.x, '1.0-0');
      this.accY = this.decPipe.transform(acceleration.y, '1.0-0');
      this.accZ = this.decPipe.transform(acceleration.z, '1.0-0');
    });
  }

  public parar(): void {
    this.finalizar.next(true);
    this.finalizar.complete();
    this.accX = '';
    this.accY = '';
    this.accZ = '';
  }
}
