import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../../servicios/usuarios.service';
import { LoginService } from '../../servicios/login.service';
import { CreditosService } from '../../servicios/creditos.service';
import { QrService } from '../../servicios/qr.service';
import { Usuario } from '../../clases/usuario';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Credito } from '../../clases/credito';
import { ToastService } from '../../servicios/toast.service';

@Component({
  selector: 'app-selector-principal',
  templateUrl: './selector-principal.component.html',
  styleUrls: ['./selector-principal.component.scss'],
})
export class SelectorPrincipalComponent implements OnInit, OnDestroy {
  usuario: Usuario;
  // listaCreditos: Credito[];
  private desuscribir = new Subject<void>();

  constructor(
    private usuarios: UsuariosService,
    private login: LoginService,
    private creditos: CreditosService,
    private qr: QrService,
    private router: Router,
    private toast: ToastService
  ) { }

  ngOnInit() {
    this.login.getUserData()
    .pipe(takeUntil(this.desuscribir))
    .subscribe(logueado => {
      if (logueado) {
        this.usuarios.getUsuario(logueado.uid)
        .pipe(takeUntil(this.desuscribir))
        .subscribe(elUsuario => {
          if (elUsuario) {
            this.usuario = elUsuario;
          }
        });

        this.qr.getResultado()
        .pipe(takeUntil(this.desuscribir))
        .subscribe(res => {
          this.creditos.getCredito(res)
          .pipe(takeUntil(this.desuscribir))
          .subscribe(elCredito => {
            if (elCredito) {
              // Inicializo los créditos si no lo están
              if (!this.usuario.creditos) {
                this.usuario.creditos = [];
              }

              if (this.puedeCargar(this.usuario, elCredito.codigo)) {
                this.usuarios.updateUsuario(this.usuario.uid, {creditos: this.usuario.creditos})
                .then(() => {
                  // Inicializo el saldo si no lo está
                  if (!this.usuario.saldo) {
                    this.usuario.saldo = 0;
                  }
                  this.usuarios.updateUsuario(this.usuario.uid, {saldo: this.usuario.saldo})
                  .then(() => {
                    // Actualizo el Usuario agregando el objeto Credito y acumulando el saldo
                    this.usuario.saldo += elCredito.importe;
                    this.usuario.creditos.push(elCredito);
                    this.usuarios.updateUsuario(this.usuario.uid, {creditos: this.usuario.creditos, saldo: this.usuario.saldo});
                  });
                });
              } else {
                this.toast.presentToast('Se ha alcanzado la cantidad máxima de cargas');
              }
            } else {
              this.toast.presentToast('No existe el código en la base de datos');
            }
          });
        });
      }
    });
  }

  ngOnDestroy() {
    this.desuscribir.next();
    this.desuscribir.complete();
    // this.qr.resultado.unsubscribe();
  }

  public cargarCredito(): void {
    this.router.navigate(['qr']);
  }

  public limpiarCredito(): void {
    this.usuario.creditos = [];
    this.usuario.saldo = 0;
    this.usuarios.updateUsuario(this.usuario.uid, {creditos: this.usuario.creditos, saldo: this.usuario.saldo});
    // this.usuarios.updateUsuario(this.usuario.uid, {creditos: [], saldo: 0});
  }

  private contarCreditos(creditos: Credito[], codigo: string): number {
    return creditos.filter(unCredito => unCredito.codigo === codigo).length;
  }

  private puedeCargar(usuario: Usuario, codigo: string): boolean {
    return this.contarCreditos(usuario.creditos, codigo) < this.creditos.getMaxCarga(usuario.perfil);
  }
}
