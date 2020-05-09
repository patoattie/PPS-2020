import { Component, OnInit, OnDestroy } from '@angular/core';
import { AcelerometroService } from '../../servicios/acelerometro.service';
import { Sentido } from '../../enums/sentido.enum';

@Component({
  selector: 'app-selector-principal',
  templateUrl: './selector-principal.component.html',
  styleUrls: ['./selector-principal.component.scss'],
})
export class SelectorPrincipalComponent implements OnInit, OnDestroy {
  public eventoAlarma = Sentido[Sentido.INICIAL];

  constructor(private acelerometro: AcelerometroService) { }

  ngOnInit() { }

  ngOnDestroy() {
    this.pararAlarma();
  }

  public alarmaActivada(): boolean {
    return this.acelerometro.activo;
  }

  public iniciarAlarma(ms: number, delta: number): void {
    this.acelerometro.eventos
    .subscribe(mensaje => {
      this.eventoAlarma = Sentido[mensaje];
    });

    this.acelerometro.iniciar(ms, delta);
  }

  public pararAlarma(): void {
    // this.acelerometro.eventos.unsubscribe();
    this.acelerometro.parar();
  }

  public getX(): number {
    return this.acelerometro.accX;
  }

  public getY(): number {
    return this.acelerometro.accY;
  }

  public getZ(): number {
    return this.acelerometro.accZ;
  }
}
