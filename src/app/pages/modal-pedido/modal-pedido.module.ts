import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ModalPedidoPage } from './modal-pedido.page';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { Keyboard } from '@ionic-native/keyboard/ngx';

const routes: Routes = [
  {
    path: '',
    component: ModalPedidoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    Geolocation,
    NativeGeocoder,
    Keyboard
  ],
  declarations: [ModalPedidoPage]
})
export class ModalPedidoPageModule { }
