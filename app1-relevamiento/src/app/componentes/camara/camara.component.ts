import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CamaraService } from '../../servicios/camara.service';
import { NavegacionService } from '../../servicios/navegacion.service';
import { SpinnerService } from '../../servicios/spinner.service';
import { TipoImagen } from '../../enums/tipo-imagen.enum';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.component.html',
  styleUrls: ['./camara.component.scss'],
})
export class CamaraComponent implements OnInit, OnDestroy {
  tipoImagenes: TipoImagen;

  constructor(
    public camara: CamaraService,
    private navegacion: NavegacionService,
    private spinner: SpinnerService,
    private ruta: ActivatedRoute
  ) { }

  ngOnInit() {
    this.navegacion.muestraBackButton = true;
    this.tipoImagenes = TipoImagen[this.ruta.snapshot.paramMap.get('tipo')];
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
      await this.camara.subirFoto(foto, this.tipoImagenes);
    });
  }

}
