import { Component, OnInit } from '@angular/core';
import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope/ngx';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';

@Component({
  selector: 'app-selector-principal',
  templateUrl: './selector-principal.component.html',
  styleUrls: ['./selector-principal.component.scss'],
})
export class SelectorPrincipalComponent implements OnInit {
  // public actual: GyroscopeOrientation;
  public xOrient: any;
  public yOrient: any;
  public zOrient: any;
  public timestamp: any;
  public accX: any;
  public accY: any;
  public accZ: any;

  constructor(
    private gyroscope: Gyroscope,
    private deviceMotion: DeviceMotion
  ) { }

  ngOnInit() {
    const options: GyroscopeOptions = {
      frequency: 1000
    };

    this.gyroscope.getCurrent(options)
    .then((orientation: GyroscopeOrientation) => {
      // console.log(orientation.x, orientation.y, orientation.z, orientation.timestamp);
      this.xOrient = orientation.x;
      this.yOrient = orientation.y;
      this.zOrient = orientation.z;
      this.timestamp = orientation.timestamp;
  })
    .catch();

    this.gyroscope.watch()
    .subscribe((orientation: GyroscopeOrientation) => {
        // console.log(orientation.x, orientation.y, orientation.z, orientation.timestamp);
        this.xOrient = orientation.x;
        this.yOrient = orientation.y;
        this.zOrient = orientation.z;
        this.timestamp = orientation.timestamp;
      });

    this.deviceMotion.getCurrentAcceleration().then(
        (acceleration: DeviceMotionAccelerationData) => {
          // console.log(acceleration);
          this.accX = acceleration.x;
          this.accY = acceleration.y;
          this.accZ = acceleration.z;
        },
        (error: any) => console.log(error)
      );

      // Watch device acceleration
    this.deviceMotion.watchAcceleration()
    .subscribe((acceleration: DeviceMotionAccelerationData) => {
        // console.log(acceleration);
        this.accX = acceleration.x;
        this.accY = acceleration.y;
        this.accZ = acceleration.z;
        });
    }
}
