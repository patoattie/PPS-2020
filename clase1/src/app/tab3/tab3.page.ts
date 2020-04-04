import { Component } from '@angular/core';
import { NavController, NavParams} from '@ionic/angular';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public color:string;

  constructor(public navCtrl: NavController) {

  }

  CambiarColor(){

    this.color="#ff6f60";
    
    console.log(this.color);
  }
}
