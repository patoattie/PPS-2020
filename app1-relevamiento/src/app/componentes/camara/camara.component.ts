import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { CamaraService } from '../../servicios/camara.service';
import { NavegacionService } from '../../servicios/navegacion.service';
import { SpinnerService } from '../../servicios/spinner.service';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.component.html',
  styleUrls: ['./camara.component.scss'],
})
export class CamaraComponent implements OnInit, OnDestroy {

  constructor(
    public camara: CamaraService,
    private navegacion: NavegacionService,
    private spinner: SpinnerService
  ) { }

  ngOnInit() {
    this.navegacion.muestraBackButton = true;
  }

  ngOnDestroy() {
    this.camara.limpiarFotos();
  }

  public tomarFoto(): void {
    this.camara.tomarFoto();
  }

  public subirFotos(): void {
    /*this.spinner.cargarEspera(2000)
    .then(() => this.camara.fotos.forEach(async foto => {
        await this.camara.subirFoto(foto);
      })
    );

    this.spinner.quitarEspera();*/

    this.camara.fotos.forEach(async foto => {
      await this.camara.subirFoto(foto);
    });
  }

}
