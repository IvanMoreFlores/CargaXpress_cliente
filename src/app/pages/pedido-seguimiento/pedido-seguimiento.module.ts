import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PedidoSeguimientoPage } from './pedido-seguimiento.page';

const routes: Routes = [
  {
    path: '',
    component: PedidoSeguimientoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PedidoSeguimientoPage]
})
export class PedidoSeguimientoPageModule {}
