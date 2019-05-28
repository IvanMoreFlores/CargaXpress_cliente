import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BuscadorLugarPage } from './buscador-lugar.page';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';

const routes: Routes = [
  {
    path: '',
    component: BuscadorLugarPage
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
    NativeGeocoder
  ],
  declarations: [BuscadorLugarPage],
  entryComponents: [
    BuscadorLugarPage
  ]
})
export class BuscadorLugarPageModule {}
