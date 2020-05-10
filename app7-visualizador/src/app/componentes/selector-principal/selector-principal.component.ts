import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavegacionService } from '../../servicios/navegacion.service';
import { VibrationService } from '../../servicios/vibration.service';

@Component({
  selector: 'app-selector-principal',
  templateUrl: './selector-principal.component.html',
  styleUrls: ['./selector-principal.component.scss'],
})
export class SelectorPrincipalComponent implements OnInit {

  constructor(
    private navegacion: NavegacionService,
    private router: Router,
    private vibration: VibrationService
  ) { }

  ngOnInit() {
    this.navegacion.muestraBackButton = false;
  }

  public navegar(destino: number): void {
    this.vibration.vibrar(100);
    this.router.navigate(['/principal/galeria', destino]);
  }

}
