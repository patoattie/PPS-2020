import { Injectable } from '@angular/core';
import { AcelerometroService } from './acelerometro.service';
import { Sentido } from '../enums/sentido.enum';

@Injectable({
  providedIn: 'root'
})
export class AlarmaService {
  private eventoAlarma = Sentido[Sentido.INICIAL];

  constructor(private acelerometro: AcelerometroService) { }

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

  public getEventoAlarma(): string {
    return this.eventoAlarma;
  }
}
