import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { Camera } from '@ionic-native/camera/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { FirestoreSettingsToken, AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { PrincipalComponent } from './componentes/principal/principal.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { SelectorPrincipalComponent } from './componentes/selector-principal/selector-principal.component';
import { HomeComponent } from './componentes/home/home.component';
import { ToolbarComponent } from './componentes/toolbar/toolbar.component';
import { LogoComponent } from './componentes/logo/logo.component';
import { LoginComponent } from './componentes/login/login.component';
import { SelectorUsuarioComponent } from './componentes/selector-usuario/selector-usuario.component';
import { CamaraComponent } from './componentes/camara/camara.component';


@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    MenuComponent,
    SelectorPrincipalComponent,
    HomeComponent,
    ToolbarComponent,
    LogoComponent,
    LoginComponent,
    SelectorUsuarioComponent,
    CamaraComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Vibration,
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: FirestoreSettingsToken, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
