import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { UsuarioPage } from './usuario.page';
import { ToolbarComponent } from '../componentes/toolbar/toolbar.component';
import { LogoComponent } from '../componentes/logo/logo.component';
import { HomePageModule } from '../home/home.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageModule,
    RouterModule.forChild([
      {
        path: '',
        component: UsuarioPage
      }
    ])
  ],
  declarations: [
    UsuarioPage/*,
    ToolbarComponent,
    LogoComponent*/
  ]
})
export class UsuarioPageModule {}
