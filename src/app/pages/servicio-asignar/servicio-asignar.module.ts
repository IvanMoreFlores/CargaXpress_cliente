import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ServicioAsignarPage } from './servicio-asignar.page';

const routes: Routes = [
  {
    path: '',
    component: ServicioAsignarPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ServicioAsignarPage]
})
export class ServicioAsignarPageModule {}
