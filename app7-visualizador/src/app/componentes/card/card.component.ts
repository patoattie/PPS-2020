import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Imagen } from '../../clases/imagen';
import { UsuariosService } from '../../servicios/usuarios.service';
import { VotacionService } from '../../servicios/votacion.service';
import { LoginService } from '../../servicios/login.service';
import { Usuario } from '../../clases/usuario';
import { TipoImagen } from '../../enums/tipo-imagen.enum';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() listaUsuarios: Usuario[];
  @Input() foto: Imagen;
  @Input() tipoImagenes: TipoImagen;
  @Output() votarEvent = new EventEmitter<string>();
  @Output() cerrarEvent = new EventEmitter<void>();

  constructor(
    private usuarios: UsuariosService,
    private login: LoginService,
    private votacion: VotacionService
  ) { }

  ngOnInit() {}

  public votar(uidImg: string): void {
    this.votarEvent.emit(uidImg);
  }

  public cerrar(): void {
    this.cerrarEvent.emit();
  }

  public getNombreUsuario(uid: string): string {
    return this.usuarios.getUnUsuario(this.listaUsuarios, uid).displayName;
  }

  public getVotada(uidImg: string): boolean {
    return this.votacion.imagenVotada(this.login.getUsuario().uid, uidImg, this.tipoImagenes);
  }

  public getCantidadVotos(uidImg: string): number {
    return this.votacion.cantidadVotos(uidImg, this.tipoImagenes);
  }
}
