import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ServicioSeguimientoPage } from './servicio-seguimiento.page';
import { ComponentsModule } from '../../components/components.module';
import { IonBottomDrawerModule } from 'ion-bottom-drawer';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';

const routes: Routes = [
  {
    path: '',
    component: ServicioSeguimientoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    IonBottomDrawerModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    Geolocation,
    NativeGeocoder
  ],
  declarations: [ServicioSeguimientoPage]
})
export class ServicioSeguimientoPageModule { }
