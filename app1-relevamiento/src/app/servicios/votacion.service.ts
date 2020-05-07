import { Injectable } from '@angular/core';
import { UsuariosService } from './usuarios.service';
import { ImagenesService } from './imagenes.service';
import { Usuario } from '../clases/usuario';
import { Imagen } from '../clases/imagen';
import { TipoImagen } from '../enums/tipo-imagen.enum';

@Injectable({
  providedIn: 'root'
})
export class VotacionService {
  private listaUsuarios: Usuario[] = [];
  private listaImagenes: Imagen[] = [];

  constructor(
    private usuarios: UsuariosService,
    private imagenes: ImagenesService
  ) {
    usuarios.getUsuarios()
    .subscribe(losUsuarios => this.listaUsuarios = losUsuarios);

    imagenes.getImagenes()
    .subscribe(lasImagenes => this.listaImagenes = lasImagenes);
  }

  public votar(uidUser: string, uidImg: string, tipo: TipoImagen): void {
    const unUsuario: Usuario = this.listaUsuarios.find(hayUsuario => hayUsuario.uid === uidUser);

    if (unUsuario) {
      if (!this.emitioVoto(unUsuario.votos, tipo)) {
        const unaImagen: Imagen = this.listaImagenes.find(hayImagen => hayImagen.uid === uidImg);

        if (unaImagen) {
          unaImagen.votos.push(uidUser);
        }

        unUsuario.votos.push(tipo);
      }
    }
  }

  private emitioVoto(tipos: TipoImagen[], tipo: TipoImagen): boolean {
    return tipos.findIndex(elemento => elemento === tipo) > -1;
  }

  public imagenVotada(uidUser: string, uidImg: string): boolean {
    let retorno = false;
    const unaImagen: Imagen = this.listaImagenes.find(hayImagen => hayImagen.uid === uidImg);

    if (unaImagen) {
      if (unaImagen.votos) {
        retorno = unaImagen.votos.findIndex(elemento => elemento === uidUser) > -1;
      }
    }

    return retorno;
  }

  public cantidadVotos(uidImg: string): number {
    let retorno = 0;
    const unaImagen: Imagen = this.listaImagenes.find(hayImagen => hayImagen.uid === uidImg);

    if (unaImagen) {
      if (unaImagen.votos) {
        retorno = unaImagen.votos.length;
      }
    }

    return retorno;
  }
}
