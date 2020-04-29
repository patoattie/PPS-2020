import { Component, OnInit } from '@angular/core';
import { CamaraService } from '../../servicios/camara.service';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.component.html',
  styleUrls: ['./camara.component.scss'],
})
export class CamaraComponent implements OnInit {

  constructor(private camara: CamaraService) { }

  ngOnInit() {}

  public tomarFoto(): void {
    this.camara.tomarFoto();
  }

}
