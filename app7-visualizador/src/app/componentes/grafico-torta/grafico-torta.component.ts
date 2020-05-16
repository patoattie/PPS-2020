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
  @Output() elegirEvent = new EventEmitter<string>();
  private uids: string[] = [];

  public pieChartOptions: ChartOptions = {
    responsive: true,
    onClick: this.elegirGrafico.bind(this),
    aspectRatio: 1
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
        this.uids.push(unaFoto.uid);
        this.pieChartLabels.push([this.getNombreUsuario(unaFoto.usuario), this.date.transform(unaFoto.fecha, 'dd/MM/yyyy HH:mm:ss')]);
      }
    });
  }

  public cerrarGrafico(): void {
    this.cerrarEvent.emit();
  }

  public elegirGrafico(e: any, a: any): any {
    // console.log(a[0]._chart.getElementAtEvent(e)[0]._index);
    // Devuelve el índice de la gráfica seleccionada, lo mapeo con el índice del array de uids de imágenes (uids)
    try {
      const idxImg = a[0]._chart.getElementAtEvent(e)[0]._index;
      this.elegirEvent.emit(this.uids[idxImg]);
      this.cerrarEvent.emit();
    } catch (error) { }
  }

  public getNombreUsuario(uid: string): string {
    return this.usuarios.getUnUsuario(this.listaUsuarios, uid).displayName;
  }
}
