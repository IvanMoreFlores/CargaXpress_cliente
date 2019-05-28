import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Plugin
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './components/menu/menu.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';

// Modal
import { BuscadorLugarPage } from './pages/buscador-lugar/buscador-lugar.page';
import { VerMasPage } from './pages/ver-mas/ver-mas.page';

@NgModule({
  declarations: [AppComponent, MenuComponent, BuscadorLugarPage, VerMasPage],
  entryComponents: [BuscadorLugarPage, VerMasPage],
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule, BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpModule,
    IonicStorageModule.forRoot()],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
