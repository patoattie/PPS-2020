import { Component, OnInit } from '@angular/core';
import { Tema } from '../../enums/tema.enum';
import { Idioma } from '../../enums/idioma.enum';
import { Tabla } from '../../clases/tabla';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-selector-principal',
  templateUrl: './selector-principal.component.html',
  styleUrls: ['./selector-principal.component.scss'],
})
export class SelectorPrincipalComponent implements OnInit {
  private tabla: Tabla = new Tabla();
  private orientacion: string;

  constructor(private screen: ScreenOrientation) { }

  ngOnInit() {
    this.tabla.idioma = Idioma.ESPAÑOL;
    this.tabla.tema = Tema.NUMEROS;
    this.orientacion = this.screen.type;

    this.screen.onChange().subscribe(
      () => {
        this.orientacion = this.screen.type;
      }
   );
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

  public getLado(boton: string): string {
    let retorno = 'top';

    switch (boton) {
      case 'tema':
        if (this.orientacion === this.screen.ORIENTATIONS.LANDSCAPE
           || this.orientacion === this.screen.ORIENTATIONS.LANDSCAPE_PRIMARY
           || this.orientacion === this.screen.ORIENTATIONS.LANDSCAPE_SECONDARY) {
          retorno = 'end';
        }
        break;
      case 'idioma':
        if (this.orientacion === this.screen.ORIENTATIONS.LANDSCAPE
           || this.orientacion === this.screen.ORIENTATIONS.LANDSCAPE_PRIMARY
           || this.orientacion === this.screen.ORIENTATIONS.LANDSCAPE_SECONDARY) {
          retorno = 'start';
        }
        break;
    }

    return retorno;
  }
}
