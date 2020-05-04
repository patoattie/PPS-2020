import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavegacionService } from '../../servicios/navegacion.service';
import { UsuariosService } from '../../servicios/usuarios.service';

@Component({
  selector: 'app-selector-principal',
  templateUrl: './selector-principal.component.html',
  styleUrls: ['./selector-principal.component.scss'],
})
export class SelectorPrincipalComponent implements OnInit {

  constructor(
    private navegacion: NavegacionService,
    private router: Router,
    private rutaActiva: ActivatedRoute,
    private usuarios: UsuariosService
  ) { }

  ngOnInit() {
    this.navegacion.muestraBackButton = false;
  }

  public async navegar(destino: number): Promise<void> {
    this.router.navigate(['/principal/camara', destino]);
    /*this.usuarios.getUsuario('gJddCsq3i9c2l1KMZcaFgyp2QRv2')
    .subscribe(losUsuarios => console.log(losUsuarios));*/
    // console.log(await this.usuarios.getUsuario('gJddCsq3i9c2l1KMZcaFgyp2QRv2'));
  }

}
