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
    const unUsuario: Usuario = this.getUsuario(uidUser);

    if (unUsuario) {
      if (!this.emitioVotoUsuario(unUsuario, tipo)) {
        const unaImagen: Imagen = this.listaImagenes.find(hayImagen => hayImagen.uid === uidImg);

        if (unaImagen) {
          if (!unaImagen.votos) {
            unaImagen.votos = [];
          }
          unaImagen.votos.push(uidUser);

          if (!unUsuario.votos) {
            unUsuario.votos = [];
          }
          unUsuario.votos.push(tipo);
        }

        // this.imagenes.updateImagen(unaImagen.uid, this.imagenes.getObject(unaImagen));
        // this.usuarios.updateUsuario(unUsuario.uid, this.usuarios.getObject(unUsuario));
        this.imagenes.updateImagen(unaImagen.uid, {votos: unaImagen.votos});
        this.usuarios.updateUsuario(unUsuario.uid, {votos: unUsuario.votos});
      }
    }
  }

  private emitioVotoUsuario(usuario: Usuario, tipo: TipoImagen): boolean {
    let retorno = false;

    if (usuario.votos) {
      retorno = usuario.votos.findIndex(elemento => elemento === tipo) > -1;
    }

    return retorno;
  }

  public emitioVoto(uidUser: string, tipo: TipoImagen): boolean {
    let retorno = false;
    const unUsuario: Usuario = this.getUsuario(uidUser);

    if (unUsuario) {
      retorno = this.emitioVotoUsuario(unUsuario, tipo);
    }

    return retorno;
  }

  public imagenVotada(uidUser: string, uidImg: string): boolean {
    let retorno = false;
    const unaImagen: Imagen = this.getImagen(uidImg);

    if (unaImagen) {
      if (unaImagen.votos) {
        retorno = unaImagen.votos.findIndex(elemento => elemento === uidUser) > -1;
      }
    }

    return retorno;
  }

  public cantidadVotos(uidImg: string): number {
    let retorno = 0;
    const unaImagen: Imagen = this.getImagen(uidImg);

    if (unaImagen) {
      if (unaImagen.votos) {
        retorno = unaImagen.votos.length;
      }
    }

    return retorno;
  }

  private getUsuario(uidUser: string): Usuario {
    return this.listaUsuarios.find(hayUsuario => hayUsuario.uid === uidUser);
  }

  private getImagen(uidImg: string): Imagen {
    return this.listaImagenes.find(hayImagen => hayImagen.uid === uidImg);
  }
}
