import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { QrService } from '../../servicios/qr.service';
import { VibrationService } from '../../servicios/vibration.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.scss'],
})
export class QrComponent implements OnInit, OnDestroy {
  private desuscribir = new Subject<void>();

  constructor(
    private qr: QrService,
    private router: Router,
    private vibration: VibrationService
  ) {}

  ngOnInit() {
    // this.showCamera();

    this.qr.getSalir()
    .pipe(takeUntil(this.desuscribir))
    .subscribe(() => {
      this.vibration.vibrar(100);
      this.router.navigate(['principal']);
    });
    this.qr.escanear();
  }

  ngOnDestroy() {
    // this.hideCamera();
    // this.qr.salir.unsubscribe();
    this.desuscribir.next();
    this.desuscribir.complete();
  }

  /*showCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
  }

  hideCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
  }*/
}
