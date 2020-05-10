import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { SelectorPrincipalComponent } from './componentes/selector-principal/selector-principal.component';
import { HomeComponent } from './componentes/home/home.component';
import { CamaraComponent } from './componentes/camara/camara.component';

// Import canActivate guard services
import { AuthGuard } from './guards/auth.guard';
import { SecureInnerPagesGuard } from './guards/secure-inner-pages.guard';
import { GaleriaComponent } from './componentes/galeria/galeria.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'principal',
    component: PrincipalComponent,
    children: [
      {
        path: '',
        redirectTo: 'selector',
        pathMatch: 'full'
      },
      {
        path: 'selector',
        component: SelectorPrincipalComponent
      },
      {
        path: 'camara/:tipo',
        component: CamaraComponent
      },
      {
        path: 'galeria/:tipo',
        component: GaleriaComponent
      }
    ], canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [SecureInnerPagesGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
