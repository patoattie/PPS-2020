import { Component } from '@angular/core';
import { NavController, NavParams} from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  selectedItem: string;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;
  show:boolean = false;

  constructor(public navCtrl: NavController) {
   
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
                  'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];

    for (let i = 1; i < 5; i++) {

      this.items.push({
          title: 'Item ' + i,
          note: 'Item #' + i,
          icon: this.icons[Math.floor(Math.random() * this.icons.length)]
        });
    }

  }

  itemTapped(event:any, item:any) {

   this.selectedItem = item.title;
   this.show = true;

   console.log(event);
   console.log(item);

  }
}
