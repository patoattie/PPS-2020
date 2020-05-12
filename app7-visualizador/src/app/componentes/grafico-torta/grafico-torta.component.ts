import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { Imagen } from '../../clases/imagen';
import { VotacionService } from '../../servicios/votacion.service';
import { Usuario } from '../../clases/usuario';
import { UsuariosService } from '../../servicios/usuarios.service';

@Component({
  selector: 'app-grafico-torta',
  templateUrl: './grafico-torta.component.html',
  styleUrls: ['./grafico-torta.component.scss'],
})
export class GraficoTortaComponent implements OnInit {
  @Input() listaFotos: Imagen[];
  @Input() listaUsuarios: Usuario[];
  @Output() cerrarEvent = new EventEmitter<void>();

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(
    private votacion: VotacionService,
    private date: DatePipe,
    private usuarios: UsuariosService
  ) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit() {
    this.listaFotos.forEach(unaFoto => {
      const cantVotos = this.votacion.cantidadVotos(unaFoto.uid, unaFoto.tipo);

      if (cantVotos > 0) {
        this.pieChartData.push(cantVotos);
        this.pieChartLabels.push([this.getNombreUsuario(unaFoto.usuario), this.date.transform(unaFoto.fecha, 'dd/MM/yyyy HH:mm:ss')]);
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