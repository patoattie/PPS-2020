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
  @Output() elegirEvent = new EventEmitter<string>();
  private datos: number[] = [];
  private uids: string[] = [];

  barChartOptions: ChartOptions = {
    responsive: true,
    onClick: this.elegirGrafico.bind(this),
    aspectRatio: 1
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
// https://www.joshmorony.com/adding-responsive-charts-graphs-to-ionic-2-applications/
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
        this.uids.push(unaFoto.uid);
        this.barChartLabels.push([
          this.getNombreUsuario(unaFoto.usuario),
          this.date.transform(unaFoto.fecha, 'dd/MM/yyyy HH:mm:ss')
        ]);
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
