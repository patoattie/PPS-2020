import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NavegacionService } from '../../servicios/navegacion.service';
import { TipoImagen } from '../../enums/tipo-imagen.enum';
import { Imagen } from '../../clases/imagen';
import { ImagenesService } from '../../servicios/imagenes.service';
import { UsuariosService } from '../../servicios/usuarios.service';
import { Usuario } from '../../clases/usuario';
import { VotacionService } from '../../servicios/votacion.service';
import { LoginService } from '../../servicios/login.service';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.scss'],
})
export class GaleriaComponent implements OnInit, OnDestroy {
  tipoImagenes: TipoImagen;
  datos: Observable<Imagen[]>;
  listaUsuarios: Usuario[] = [];
  private desuscribir = new Subject<void>();

  constructor(
    private navegacion: NavegacionService,
    private router: Router,
    private ruta: ActivatedRoute,
    private imagenes: ImagenesService,
    private usuarios: UsuariosService,
    private votacion: VotacionService,
    private login: LoginService
  ) { }

  // this.tipoImagenes -> Devuelve LINDA o FEA
  // TipoImagen[this.tipoImagenes] -> Devuelve 0 o 1

  ngOnInit() {
    this.navegacion.muestraBackButton = true;
    this.tipoImagenes = TipoImagen[this.ruta.snapshot.paramMap.get('tipo')];

    this.datos = this.imagenes.getImagenesPorTipo(this.tipoImagenes)
    .pipe(takeUntil(this.desuscribir));

    this.usuarios.getUsuarios()
    .pipe(takeUntil(this.desuscribir)) // desuscribe el observable cuando se emita el desuscribir.
    .subscribe(losUsuarios => this.listaUsuarios = losUsuarios);
  }

  ngOnDestroy() {
    this.desuscribir.next();
    this.desuscribir.complete();
  }

  public tomarFoto(): void {
    this.router.navigate(['/principal/camara', TipoImagen[this.tipoImagenes]]);
  }

  public getNombreUsuario(uid: string): string {
    return this.listaUsuarios.filter(unUsuario => unUsuario.uid === uid)[0].displayName;
  }

  public getVotada(uidImg: string): boolean {
// console.log('getVotada: ', this.votacion.imagenVotada(uidUser, uidImg));
    return this.votacion.imagenVotada(this.login.getUsuario().uid, uidImg, this.tipoImagenes);
  }

  public getCantidadVotos(uidImg: string): number {
    return this.votacion.cantidadVotos(uidImg, this.tipoImagenes);
  }

  private emitioVoto(): boolean {
// console.log('emitioVoto: ', this.votacion.emitioVoto(uidUser, this.tipoImagenes));
    return this.votacion.emitioVoto(this.login.getUsuario().uid, this.tipoImagenes);
  }

  public votar(uidImg: string): void {
    const imgVotada = this.getVotada(uidImg);

    if ((!this.emitioVoto() && !imgVotada) || imgVotada) {
      this.votacion.votar(this.login.getUsuario().uid, uidImg, this.tipoImagenes);
    }
  }
}
