import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NavegacionService } from '../../servicios/navegacion.service';
import { TipoImagen } from '../../enums/tipo-imagen.enum';
import { TipoGrafico } from '../../enums/tipo-grafico.enum';
import { Imagen } from '../../clases/imagen';
import { ImagenesService } from '../../servicios/imagenes.service';
import { UsuariosService } from '../../servicios/usuarios.service';
import { Usuario } from '../../clases/usuario';
import { VotacionService } from '../../servicios/votacion.service';
import { LoginService } from '../../servicios/login.service';
import { AcelerometroService } from '../../servicios/acelerometro.service';
import { Sentido } from '../../enums/sentido.enum';
import { ToastService } from '../../servicios/toast.service';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.scss'],
})
export class GaleriaComponent implements OnInit, OnDestroy {
  tipoImagenes: TipoImagen;
  listaUsuarios: Usuario[] = [];
  private listaFotos: Imagen[] = [];
  listaFotosUsuario: Imagen[] = [];
  private desuscribir = new Subject<void>();
  idxFoto = 0;
  private capturaMov = true;
  private ultMov: Sentido;
  filtroUsuario = false;
  tipoGrafico: string;
  muestraGrafico = false;

  // https://www.positronx.io/angular-chart-js-tutorial-with-ng2-charts-examples/

  constructor(
    private navegacion: NavegacionService,
    private router: Router,
    private ruta: ActivatedRoute,
    private imagenes: ImagenesService,
    private usuarios: UsuariosService,
    private votacion: VotacionService,
    private login: LoginService,
    private acelerometro: AcelerometroService,
    private toast: ToastService
  ) { }

  // this.tipoImagenes -> Devuelve LINDA o FEA
  // TipoImagen[this.tipoImagenes] -> Devuelve 0 o 1

  ngOnInit() {
    this.navegacion.muestraBackButton = true;
    this.tipoImagenes = TipoImagen[this.ruta.snapshot.paramMap.get('tipo')];
    this.navegacion.setTitulo('Cosas '.concat(this.tipoImagenes.toString().toLowerCase()).concat('s'));

    switch (TipoImagen[this.ruta.snapshot.paramMap.get('tipo')]) {
      case 'FEA':
        this.tipoGrafico = TipoGrafico[TipoGrafico.BARRA];
        break;
      case 'LINDA':
        this.tipoGrafico = TipoGrafico[TipoGrafico.TORTA];
        break;
    }

    this.imagenes.getImagenesPorTipo(this.tipoImagenes)
    .pipe(takeUntil(this.desuscribir))
    .subscribe(lasFotos => {
      this.listaFotos = lasFotos;
      this.listaFotosUsuario = lasFotos;
    });

    this.usuarios.getUsuarios()
    .pipe(takeUntil(this.desuscribir)) // desuscribe el observable cuando se emita el desuscribir.
    .subscribe(losUsuarios => this.listaUsuarios = losUsuarios);

    this.acelerometro.iniciar(500, 2);

    this.acelerometro.eventos
    .subscribe(movimiento => {
      if (this.capturaMov) {
        switch (movimiento) {
          case Sentido.IZQUIERDA:
            this.capturaMov = false;
            this.anterior();
            break;
          case Sentido.DERECHA:
            this.capturaMov = false;
            this.siguiente();
            break;
        }

      } else {
        if (movimiento === Sentido.DERECHA || movimiento === Sentido.IZQUIERDA) {
          this.capturaMov = true;
        }
      }

      if ((movimiento === Sentido.VERTICAL && this.ultMov === Sentido.HORIZONTAL)
      || (movimiento === Sentido.HORIZONTAL && this.ultMov === Sentido.VERTICAL)) {
        this.idxFoto = 0;
      }

      this.ultMov = movimiento;
    });
  }

  ngOnDestroy() {
    this.desuscribir.next();
    this.desuscribir.complete();
    this.acelerometro.parar();
    this.acelerometro.eventos.unsubscribe();
  }

  public tomarFoto(): void {
    this.router.navigate(['/principal/camara', TipoImagen[this.tipoImagenes]]);
  }

  private emitioVoto(): boolean {
    return this.votacion.emitioVoto(this.login.getUsuario().uid, this.tipoImagenes);
  }

  public getVotada(uidImg: string): boolean {
    return this.votacion.imagenVotada(this.login.getUsuario().uid, uidImg, this.tipoImagenes);
  }

  public votar(uidImg: string): void {
    const imgVotada = this.getVotada(uidImg);

    if ((!this.emitioVoto() && !imgVotada) || imgVotada) {
      this.votacion.votar(this.login.getUsuario().uid, uidImg, this.tipoImagenes);
    }
  }

  public siguiente(): void {
    if (this.listaFotosUsuario.length > 0) {
      this.idxFoto = this.idxFoto + (this.idxFoto === this.listaFotosUsuario.length - 1 ? 0 : 1);
    }
  }

  public anterior(): void {
    this.idxFoto = this.idxFoto - (this.idxFoto === 0 ? 0 : 1);
  }

  public filtro(): void {
    this.filtroUsuario = !this.filtroUsuario;

    this.toast.presentToast(this.filtroUsuario ? 'Sólo mis fotos' : 'Todas las fotos');

    this.listaFotosUsuario = this.listaFotos.filter(unaImagen =>
      this.filtroUsuario ? unaImagen.usuario === this.login.getUsuario().uid : true);
  }

  public grafico(muestra: boolean): void {
    this.muestraGrafico = muestra;
  }

  public elegir(uidImg: string): void {
    /*const idxImg = this.listaFotosUsuario.findIndex(unaFoto =>
      this.usuarios.getUnUsuario(this.listaUsuarios, unaFoto.usuario).uid === datos[2]
      && this.date.transform(unaFoto.fecha, 'dd/MM/yyyy HH:mm:ss') === datos[1]);*/
    const idxImg = this.listaFotosUsuario.findIndex(unaFoto => unaFoto.uid === uidImg);

    if (idxImg > -1) {
      this.idxFoto = idxImg;
    }
  }
}
