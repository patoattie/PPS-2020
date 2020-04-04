import { Component } from '@angular/core';
import { NavController} from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public nombre:string;
  public apellido:string;
  public mostrar:boolean;
  public direccion:string;

  constructor(public navCtrl: NavController) {
    this.mostrar=false;
  }

  MostrarDatos(nom: string, ap: string){
    
    this.nombre = nom;
    this.apellido = ap;
    this.mostrar = true;
  }

}
