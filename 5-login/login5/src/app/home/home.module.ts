import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { ToolbarComponent } from '../componentes/toolbar/toolbar.component';
import { LoginComponent } from '../componentes/login/login.component';
import { LogoComponent } from '../componentes/logo/logo.component';
import { SelectorUsuarioComponent } from '../componentes/selector-usuario/selector-usuario.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [
    HomePage,
    ToolbarComponent,
    LoginComponent,
    LogoComponent,
    SelectorUsuarioComponent
  ],
  exports: [
    ToolbarComponent,
    LogoComponent
  ]
})
export class HomePageModule {}
