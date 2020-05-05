import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavegacionService } from '../../servicios/navegacion.service';

@Component({
  selector: 'app-selector-principal',
  templateUrl: './selector-principal.component.html',
  styleUrls: ['./selector-principal.component.scss'],
})
export class SelectorPrincipalComponent implements OnInit {

  constructor(
    private navegacion: NavegacionService,
    private router: Router
  ) { }

  ngOnInit() {
    this.navegacion.muestraBackButton = false;
  }

  public navegar(destino: number): void {
    // this.router.navigate(['/principal/camara', destino]);
    this.router.navigate(['/principal/galeria', destino]);
  }

}
