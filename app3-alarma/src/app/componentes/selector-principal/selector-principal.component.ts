import { Component, OnInit } from '@angular/core';
import { Tema } from '../../enums/tema.enum';
import { Idioma } from '../../enums/idioma.enum';
import { Tabla } from '../../clases/tabla';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';

@Component({
  selector: 'app-selector-principal',
  templateUrl: './selector-principal.component.html',
  styleUrls: ['./selector-principal.component.scss'],
})
export class SelectorPrincipalComponent implements OnInit {
  private tabla: Tabla = new Tabla();
  private orientacion: string;
  private audio = new Audio();

  constructor(
    private screen: ScreenOrientation,
    private vibration: Vibration
  ) { }

  ngOnInit() {
    this.tabla.idioma = Idioma.ESPAÑOL;
    this.tabla.tema = Tema.COLORES;
    this.orientacion = this.screen.type;

    this.screen.onChange().subscribe(
      () => {
        this.orientacion = this.screen.type; // Capturo los cambios de orientacion de la pantalla.
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
    let retorno = 'top'; // Por defecto muestro los fab hacia arriba.

    // Si la pantalla tiene orientacion horizontal, entonces muestro los fab hacia los lados
    switch (boton) {
      case 'tema':
        if (this.orientacion.includes(this.screen.ORIENTATIONS.LANDSCAPE)) {
          retorno = 'end';
        }
        break;
      case 'idioma':
        if (this.orientacion.includes(this.screen.ORIENTATIONS.LANDSCAPE)) {
          retorno = 'start';
        }
        break;
    }

    return retorno;
  }

  public getIcono(boton: string): string {
    let retorno: string;

    // Si la pantalla tiene orientacion horizontal, entonces muestro los fab hacia los lados
    switch (boton) {
      case 'tema':
        switch (this.getTema()) {
          case 'animales':
            retorno = '../../../assets/animales/gato.png';
            break;
          case 'numeros':
            retorno = '../../../assets/numeros.png';
            break;
          case 'colores':
            retorno = '../../../assets/color-palette-psd-icon.png';
            break;
        }
        break;
      case 'idioma':
        switch (this.getIdioma()) {
          case 'español':
            retorno = '../../../assets/banderas/arg.png';
            break;
          case 'ingles':
            retorno = '../../../assets/banderas/ing.png';
            break;
          case 'portugues':
            retorno = '../../../assets/banderas/bra.png';
            break;
        }
        break;
    }

    return retorno;
  }

  public reproducir(boton: number): void {
    let ruta = '../../../assets/audios/';
    this.vibration.vibrate(100);

    switch (boton) {
      case 1:
        ruta = ruta.concat(ruta, this.getTema(), '/', this.getIdioma(), '/', 'uno.ogg');
        break;
      case 2:
        ruta = ruta.concat(ruta, this.getTema(), '/', this.getIdioma(), '/', 'dos.ogg');
        break;
      case 3:
        ruta = ruta.concat(ruta, this.getTema(), '/', this.getIdioma(), '/', 'tres.ogg');
        break;
      case 4:
        ruta = ruta.concat(ruta, this.getTema(), '/', this.getIdioma(), '/', 'cuatro.ogg');
        break;
      case 5:
        ruta = ruta.concat(ruta, this.getTema(), '/', this.getIdioma(), '/', 'cinco.ogg');
        break;
      case 6:
        ruta = ruta.concat(ruta, this.getTema(), '/', this.getIdioma(), '/', 'seis.ogg');
        break;
      case 7:
        ruta = ruta.concat(ruta, this.getTema(), '/', this.getIdioma(), '/', 'siete.ogg');
        break;
      case 8:
        ruta = ruta.concat(ruta, this.getTema(), '/', this.getIdioma(), '/', 'ocho.ogg');
        break;
      case 9:
        ruta = ruta.concat(ruta, this.getTema(), '/', this.getIdioma(), '/', 'nueve.ogg');
        break;
    }

    this.audio.src = ruta;
    this.audio.load();
    this.audio.play();
  }
}
