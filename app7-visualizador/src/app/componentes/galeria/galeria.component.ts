import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NavegacionService } from '../../servicios/navegacion.service';
import { TipoImagen } from '../../enums/tipo-imagen.enum';
import { Imagen } from '../../clases/imagen';
import { ImagenesService } from '../../servicios/imagenes.service';
import { UsuariosService } from '../../servicios/usuarios.service';
import { Usuario } from '../../clases/usuario';
import { VotacionService } from '../../servicios/votacion.service';
import { LoginService } from '../../servicios/login.service';
import { AcelerometroService } from '../../servicios/acelerometro.service';
import { Sentido } from '../../enums/sentido.enum';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.scss'],
})
export class GaleriaComponent implements OnInit, OnDestroy {
  private tipoImagenes: TipoImagen;
  private listaUsuarios: Usuario[] = [];
  listaFotos: Imagen[] = [];
  private desuscribir = new Subject<void>();
  idxFoto = 0;
  private capturaMov = true;
  private ultMov: Sentido;

  constructor(
    private navegacion: NavegacionService,
    private router: Router,
    private ruta: ActivatedRoute,
    private imagenes: ImagenesService,
    private usuarios: UsuariosService,
    private votacion: VotacionService,
    private login: LoginService,
    private acelerometro: AcelerometroService
  ) { }

  // this.tipoImagenes -> Devuelve LINDA o FEA
  // TipoImagen[this.tipoImagenes] -> Devuelve 0 o 1

  ngOnInit() {
    this.navegacion.muestraBackButton = true;
    this.tipoImagenes = TipoImagen[this.ruta.snapshot.paramMap.get('tipo')];

    this.imagenes.getImagenesPorTipo(this.tipoImagenes)
    .pipe(takeUntil(this.desuscribir))
    .subscribe(lasFotos => this.listaFotos = lasFotos);

    this.usuarios.getUsuarios()
    .pipe(takeUntil(this.desuscribir)) // desuscribe el observable cuando se emita el desuscribir.
    .subscribe(losUsuarios => this.listaUsuarios = losUsuarios);

    this.acelerometro.iniciar(1000, 2);

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

  public getNombreUsuario(uid: string): string {
    return this.listaUsuarios.filter(unUsuario => unUsuario.uid === uid)[0].displayName;
  }

  public getVotada(uidImg: string): boolean {
    return this.votacion.imagenVotada(this.login.getUsuario().uid, uidImg, this.tipoImagenes);
  }

  public getCantidadVotos(uidImg: string): number {
    return this.votacion.cantidadVotos(uidImg, this.tipoImagenes);
  }

  private emitioVoto(): boolean {
    return this.votacion.emitioVoto(this.login.getUsuario().uid, this.tipoImagenes);
  }

  public votar(uidImg: string): void {
    const imgVotada = this.getVotada(uidImg);

    if ((!this.emitioVoto() && !imgVotada) || imgVotada) {
      this.votacion.votar(this.login.getUsuario().uid, uidImg, this.tipoImagenes);
    }
  }

  public siguiente(): void {
    if (this.listaFotos.length > 0) {
      this.idxFoto = this.idxFoto + (this.idxFoto === this.listaFotos.length - 1 ? 0 : 1);
    }
  }

  public anterior(): void {
    this.idxFoto = this.idxFoto - (this.idxFoto === 0 ? 0 : 1);
  }
}
