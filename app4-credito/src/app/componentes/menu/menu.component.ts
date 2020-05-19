import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../../servicios/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Output() salirEvent = new EventEmitter<void>();

  constructor(private login: LoginService) { }

  ngOnInit() {}

  salir(): void {
    this.salirEvent.emit();
  }

  getUserName(): string {
    return this.login.getUsuario().displayName;
  }
}
