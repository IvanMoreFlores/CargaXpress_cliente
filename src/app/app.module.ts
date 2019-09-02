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
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { File } from '@ionic-native/file/ngx';

// Modal
import { BuscadorLugarPage } from './pages/buscador-lugar/buscador-lugar.page';
import { VerMasPage } from './pages/ver-mas/ver-mas.page';
import { ModalDetailPage } from './pages/modal-detail/modal-detail.page';
import { PedidoHistorialPage } from './pages/pedido-historial/pedido-historial.page';
import { OrdenPagoPage } from './pages/orden-pago/orden-pago.page';
import { ServicioChoferPage } from './pages/servicio-chofer/servicio-chofer.page';

// Socket
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = {
  url: 'https://cargaxpress-socket-dev.mybluemix.net', options: {
    path: '/carga-socket',
    autoConnect: false,
    transports: ['websocket', 'polling']
  }
};

@NgModule({
  declarations: [AppComponent,
    MenuComponent,
    BuscadorLugarPage,
    VerMasPage,
    ModalDetailPage,
    PedidoHistorialPage,
    OrdenPagoPage,
    ServicioChoferPage],
  entryComponents: [BuscadorLugarPage,
    VerMasPage,
    ModalDetailPage,
    PedidoHistorialPage,
    OrdenPagoPage,
    ServicioChoferPage],
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule, BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpModule,
    IonicStorageModule.forRoot(),
    SocketIoModule.forRoot(config)],
  providers: [
    StatusBar,
    SplashScreen,
    SocialSharing,
    File,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
