import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CamaraService } from '../../servicios/camara.service';
import { NavegacionService } from '../../servicios/navegacion.service';
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
    private ruta: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.navegacion.muestraBackButton = true;
    this.tipoImagenes = TipoImagen[this.ruta.snapshot.paramMap.get('tipo')];
    this.tomarFoto();
  }

  ngOnDestroy() {
    this.camara.limpiarFotos();
  }

  public tomarFoto(): void {
    this.camara.tomarFoto();
  }

  public subirFotos(): void {
    // this.spinner.cargarEspera(15000);

    this.camara.subirFotos(this.tipoImagenes)
    .then(() => {
      this.camara.limpiarFotos();
      this.router.navigate(['/principal/galeria', TipoImagen[this.tipoImagenes]]);
    });

    // this.spinner.quitarEspera();
  }
}
