import { Injectable } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QrService {
  public resultado = new Subject<string>();

  constructor(private qrScanner: QRScanner) { }

  public escanear(): void {
    // Optionally request the permission early
    this.qrScanner.prepare()
    .then((status: QRScannerStatus) => {
      if (status.authorized) {
alert('autorizado');
        // camera permission was granted
        this.qrScanner.show();

        // start scanning
        const scanSub = this.qrScanner.scan().subscribe((text: string) => {
          // console.log('Scanned something', text);
          this.resultado.next(text);

          this.qrScanner.hide(); // hide camera preview
          scanSub.unsubscribe(); // stop scanning
        });

      } else if (status.denied) {
alert('denied');
        // camera permission was permanently denied
        // you must use QRScanner.openSettings() method to guide the user to the settings page
        // then they can grant the permission from there
      } else {
alert('otro');
        // permission was denied, but not permanently. You can ask for permission again at a later time.
      }
    })
    .catch((e: any) => alert(e.name) /*console.log('Error: ', e)*/);
  }
}
