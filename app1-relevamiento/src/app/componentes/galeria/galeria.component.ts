import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { NavegacionService } from '../../servicios/navegacion.service';
import { TipoImagen } from '../../enums/tipo-imagen.enum';
import { Imagen } from '../../clases/imagen';
import { ImagenesService } from '../../servicios/imagenes.service';
import { UsuariosService } from '../../servicios/usuarios.service';
import { Usuario } from '../../clases/usuario';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.scss'],
})
export class GaleriaComponent implements OnInit {
  tipoImagenes: TipoImagen;
  datos: Observable<Imagen[]>;
  listaUsuarios: Usuario[] = [];

  constructor(
    private navegacion: NavegacionService,
    private router: Router,
    private ruta: ActivatedRoute,
    private imagenes: ImagenesService,
    private usuarios: UsuariosService
  ) { }

  // this.tipoImagenes -> Devuelve LINDA o FEA
  // TipoImagen[this.tipoImagenes] -> Devuelve 0 o 1

  ngOnInit() {
    this.navegacion.muestraBackButton = true;
    this.tipoImagenes = TipoImagen[this.ruta.snapshot.paramMap.get('tipo')];

    this.datos = this.imagenes.getImagenesPorTipo(this.tipoImagenes);
    this.usuarios.getUsuarios()
    .subscribe(losUsuarios => this.listaUsuarios = losUsuarios);
  }

  public tomarFoto(): void {
    this.router.navigate(['/principal/camara', TipoImagen[this.tipoImagenes]]);
  }

  public getNombreUsuario(uid: string): string {
    return this.listaUsuarios.filter(unUsuario => unUsuario.uid === uid)[0].displayName;
  }
}
