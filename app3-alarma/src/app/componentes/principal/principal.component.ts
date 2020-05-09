import { Component, OnInit, OnDestroy } from '@angular/core';
import { Usuario } from '../../clases/usuario';
import { LoginService } from '../../servicios/login.service';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlarmaService } from '../../servicios/alarma.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
})
export class PrincipalComponent implements OnInit, OnDestroy {
  usuarioLogueado: Usuario = this.login.getUsuario();
  private idMenu = 'menuLogout';
  public clave: string;

  constructor(
    private login: LoginService,
    private menu: MenuController,
    private router: Router,
    private alarma: AlarmaService
  ) { }

  ngOnInit() {}

  ngOnDestroy() {
    this.pararAlarma();
  }

  abrirMenu() {
    this.menu.open(this.idMenu);
  }

  hacerLogout(): void {
    this.menu.close(this.idMenu);

    if (!this.alarmaActivada()) {
      this.login.logout()
      .then(() => this.router.navigate(['home']));
    }
  }

  public alarmaActivada(): boolean {
    return this.alarma.alarmaActivada();
  }

  public iniciarAlarma(ms: number, delta: number): void {
    this.alarma.iniciarAlarma(ms, delta);
  }

  public pararAlarma(): void {
    this.alarma.pararAlarma(this.clave);
  }

  public getX(): number {
    return this.alarma.getX();
  }

  public getY(): number {
    return this.alarma.getY();
  }

  public getZ(): number {
    return this.alarma.getZ();
  }

  public getEventoAlarma(): string {
    return this.alarma.getEventoAlarma();
  }
}
