import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlarmaService } from '../../servicios/alarma.service';

@Component({
  selector: 'app-selector-principal',
  templateUrl: './selector-principal.component.html',
  styleUrls: ['./selector-principal.component.scss'],
})
export class SelectorPrincipalComponent implements OnInit, OnDestroy {
  public clave: string;

  constructor(private alarma: AlarmaService) { }

  ngOnInit() { }

  ngOnDestroy() {
    this.pararAlarma();
  }

  public alarmaActivada(): boolean {
    return this.alarma.alarmaActivada();
  }

  public iniciarAlarma(ms: number, delta: number): void {
    this.alarma.iniciarAlarma(ms, delta);
  }

  public pararAlarma(): void {
    this.alarma.pararAlarma(this.clave);
  }

  public getX(): number {
    return this.alarma.getX();
  }

  public getY(): number {
    return this.alarma.getY();
  }

  public getZ(): number {
    return this.alarma.getZ();
  }

  public getEventoAlarma(): string {
    return this.alarma.getEventoAlarma();
  }
}
