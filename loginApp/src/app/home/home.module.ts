import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { ToolbarComponent } from '../componentes/toolbar/toolbar.component';
import { LoginComponent } from '../componentes/login/login.component';
import { LogoComponent } from '../componentes/logo/logo.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
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
    LogoComponent
  ]
})
export class HomePageModule {}
