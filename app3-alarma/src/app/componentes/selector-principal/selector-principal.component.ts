import { Component, OnInit, OnDestroy } from '@angular/core';
import { AcelerometroService } from '../../servicios/acelerometro.service';

@Component({
  selector: 'app-selector-principal',
  templateUrl: './selector-principal.component.html',
  styleUrls: ['./selector-principal.component.scss'],
})
export class SelectorPrincipalComponent implements OnInit, OnDestroy {

  constructor(public acelerometro: AcelerometroService) { }

  ngOnInit() { }

  ngOnDestroy() {
    this.acelerometro.parar();
  }

}
