import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuariosService } from '../../servicios/usuarios.service';
import { AuthFirebaseService } from '../../servicios/auth-firebase.service';
import { Usuario } from '../../clases/usuario';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-selector-principal',
  templateUrl: './selector-principal.component.html',
  styleUrls: ['./selector-principal.component.scss'],
})
export class SelectorPrincipalComponent implements OnInit, OnDestroy {
  usuario: Usuario;
  private desuscribir = new Subject<void>();

  constructor(
    private usuarios: UsuariosService,
    private auth: AuthFirebaseService
  ) { }

  ngOnInit() {
    this.auth.getUsuarioRemoto()
    .pipe(takeUntil(this.desuscribir))
    .subscribe(logueado => {
      if (logueado) {
        this.usuarios.getUsuario(logueado.uid)
        .pipe(takeUntil(this.desuscribir))
        .subscribe(elUsuario => this.usuario = elUsuario);
      }
    });
  }

  ngOnDestroy() {
    this.desuscribir.next();
    this.desuscribir.complete();
  }

}
