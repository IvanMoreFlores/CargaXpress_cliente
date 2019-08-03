import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PedidoAsignarPage } from './pedido-asignar.page';

const routes: Routes = [
  {
    path: '',
    component: PedidoAsignarPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PedidoAsignarPage]
})
export class PedidoAsignarPageModule {}
