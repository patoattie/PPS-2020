import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../../servicios/usuarios.service';
import { LoginService } from '../../servicios/login.service';
import { CreditosService } from '../../servicios/creditos.service';
import { QrService } from '../../servicios/qr.service';
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
    private login: LoginService,
    private creditos: CreditosService,
    private qr: QrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.login.getUserData()
    .pipe(takeUntil(this.desuscribir))
    .subscribe(logueado => {
      if (logueado) {
        this.usuarios.getUsuario(logueado.uid)
        .pipe(takeUntil(this.desuscribir))
        .subscribe(elUsuario => this.usuario = elUsuario);

        this.qr.resultado.subscribe(res => {
          this.creditos.getCreditoPorCodigo(res)
          .pipe(takeUntil(this.desuscribir))
          .subscribe(elCredito => {
            if (elCredito[0]) {
              // Actualizo el Usuario agregando el objeto Credito
              this.usuario.saldo += elCredito[0].importe;
              this.usuario.creditos.push(elCredito[0]);
              this.usuarios.updateUsuario(this.usuario.uid, this.usuarios.getObject(this.usuario));
            }
          });
        });
      }
    });
  }

  ngOnDestroy() {
    this.desuscribir.next();
    this.desuscribir.complete();
    this.qr.resultado.unsubscribe();
  }

  public cargarCredito(): void {
    this.router.navigate(['qr']);
  }

}
