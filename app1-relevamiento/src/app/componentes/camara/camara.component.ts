import { Component, OnInit } from '@angular/core';
import { CamaraService } from '../../servicios/camara.service';
import { NavegacionService } from '../../servicios/navegacion.service';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.component.html',
  styleUrls: ['./camara.component.scss'],
})
export class CamaraComponent implements OnInit {

  constructor(
    public camara: CamaraService,
    private navegacion: NavegacionService
  ) { }

  ngOnInit() {
    this.navegacion.muestraBackButton = true;
  }

  public tomarFoto(): void {
    this.camara.tomarFoto();
  }

}
