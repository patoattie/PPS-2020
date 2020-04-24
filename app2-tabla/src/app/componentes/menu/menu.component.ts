import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Output() salirEvent = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {}

  salir(): void {
    this.salirEvent.emit();
  }

}
