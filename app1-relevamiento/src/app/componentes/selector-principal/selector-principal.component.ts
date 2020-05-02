import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavegacionService } from '../../servicios/navegacion.service';

@Component({
  selector: 'app-selector-principal',
  templateUrl: './selector-principal.component.html',
  styleUrls: ['./selector-principal.component.scss'],
})
export class SelectorPrincipalComponent implements OnInit {

  constructor(
    private navegacion: NavegacionService,
    private router: Router,
    private rutaActiva: ActivatedRoute
  ) { }

  ngOnInit() {
    this.navegacion.muestraBackButton = false;
  }

  public navegar(destino: number): void {
    this.router.navigate(['/principal/camara', destino]);
  }

}
