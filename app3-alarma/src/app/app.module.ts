import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { DeviceMotion } from '@ionic-native/device-motion/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { FirestoreSettingsToken, AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { PrincipalComponent } from './componentes/principal/principal.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { HomeComponent } from './componentes/home/home.component';
import { ToolbarComponent } from './componentes/toolbar/toolbar.component';
import { LogoComponent } from './componentes/logo/logo.component';
import { LoginComponent } from './componentes/login/login.component';
import { SelectorUsuarioComponent } from './componentes/selector-usuario/selector-usuario.component';


@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    MenuComponent,
    HomeComponent,
    ToolbarComponent,
    LogoComponent,
    LoginComponent,
    SelectorUsuarioComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Vibration,
    Flashlight,
    DeviceMotion,
    DecimalPipe,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: FirestoreSettingsToken, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
