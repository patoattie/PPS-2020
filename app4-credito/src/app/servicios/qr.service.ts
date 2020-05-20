import { Injectable } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QrService {
  public resultado = new Subject<string>();
  public salir = new Subject<void>();

  constructor(private qrScanner: QRScanner) { }

  public escanear(): void {
    // Optionally request the permission early
    this.qrScanner.prepare()
    .then((status: QRScannerStatus) => {
      if (status.authorized) {
        // camera permission was granted

        // start scanning
        const scanSub = this.qrScanner.scan().subscribe((text: string) => {
          // console.log('Scanned something', text);
          this.resultado.next(text);
          this.salir.next();
          // alert(text);

          this.qrScanner.hide(); // hide camera preview
          scanSub.unsubscribe(); // stop scanning
        });

        this.qrScanner.show();
      } else if (status.denied) {
        // camera permission was permanently denied
        // you must use QRScanner.openSettings() method to guide the user to the settings page
        // then they can grant the permission from there
      } else {
        // permission was denied, but not permanently. You can ask for permission again at a later time.
      }
    })
    .catch((e: any) => alert(e.name) /*console.log('Error: ', e)*/);
  }
}