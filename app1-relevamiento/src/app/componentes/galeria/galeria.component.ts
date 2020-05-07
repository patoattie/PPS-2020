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
    private votacion: VotacionService
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

  public getVotada(uidUser: string, uidImg: string): boolean {
    return this.votacion.imagenVotada(uidUser, uidImg);
  }

  public getCantidadVotos(uidImg: string): number {
    return this.votacion.cantidadVotos(uidImg);
  }
}
