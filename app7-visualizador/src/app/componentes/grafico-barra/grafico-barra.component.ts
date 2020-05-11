import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { Imagen } from '../../clases/imagen';
import { VotacionService } from '../../servicios/votacion.service';
import { Usuario } from '../../clases/usuario';
import { UsuariosService } from '../../servicios/usuarios.service';

@Component({
  selector: 'app-grafico-barra',
  templateUrl: './grafico-barra.component.html',
  styleUrls: ['./grafico-barra.component.scss'],
})
export class GraficoBarraComponent implements OnInit {
  @Input() listaFotos: Imagen[];
  @Input() listaUsuarios: Usuario[];
  @Output() cerrarEvent = new EventEmitter<void>();
  private datos: number[] = [];

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    {
      data: this.datos,
      label: 'Fotos más votadas'
    }
  ];

  constructor(
    private votacion: VotacionService,
    private date: DatePipe,
    private usuarios: UsuariosService
  ) { }

  ngOnInit() {
    this.listaFotos.forEach(unaFoto => {
      const cantVotos = this.votacion.cantidadVotos(unaFoto.uid, unaFoto.tipo);

      if (cantVotos > 0) {
        this.datos.push(cantVotos);
        this.barChartLabels.push([this.getNombreUsuario(unaFoto.usuario), this.date.transform(unaFoto.fecha, 'dd/MM/yyyy HH:mm:ss')]);
      }
    });
  }

  public cerrarGrafico(): void {
    this.cerrarEvent.emit();
  }

  public getNombreUsuario(uid: string): string {
    return this.usuarios.getUnUsuario(this.listaUsuarios, uid).displayName;
  }
}
