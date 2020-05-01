import { Component, OnInit } from '@angular/core';
import { NavegacionService } from '../../servicios/navegacion.service';

@Component({
  selector: 'app-selector-principal',
  templateUrl: './selector-principal.component.html',
  styleUrls: ['./selector-principal.component.scss'],
})
export class SelectorPrincipalComponent implements OnInit {

  constructor(private navegacion: NavegacionService) { }

  ngOnInit() {
    this.navegacion.muestraBackButton = false;
  }

}
