import { Component, OnInit } from '@angular/core';
import { Tema } from '../../enums/tema.enum';
import { Idioma } from '../../enums/idioma.enum';
import { Tabla } from '../../clases/tabla';

@Component({
  selector: 'app-selector-principal',
  templateUrl: './selector-principal.component.html',
  styleUrls: ['./selector-principal.component.scss'],
})
export class SelectorPrincipalComponent implements OnInit {
  private tabla: Tabla = new Tabla();

  constructor() { }

  ngOnInit() {
    this.tabla.idioma = Idioma.ESPAÑOL;
    this.tabla.tema = Tema.NUMEROS;
  }

  public getTema(): string {
    return this.tabla.tema.toString();
  }

  public setTema(tema: string): void {
    switch (tema) {
      case 'animales':
        this.tabla.tema = Tema.ANIMALES;
        break;
      case 'numeros':
        this.tabla.tema = Tema.NUMEROS;
        break;
      case 'colores':
        this.tabla.tema = Tema.COLORES;
        break;
    }
  }

  public getIdioma(): string {
    return this.tabla.idioma.toString();
  }

  public setIdioma(idioma: string): void {
    switch (idioma) {
      case 'español':
        this.tabla.idioma = Idioma.ESPAÑOL;
        break;
      case 'ingles':
        this.tabla.idioma = Idioma.INGLES;
        break;
      case 'portugues':
        this.tabla.idioma = Idioma.PORTUGUES;
        break;
    }
  }
}
