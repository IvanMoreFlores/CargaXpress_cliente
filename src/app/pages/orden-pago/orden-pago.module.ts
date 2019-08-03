import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { OrdenPagoPage } from './orden-pago.page';

import { NgXCreditCardsModule } from 'ngx-credit-cards';

const routes: Routes = [
  {
    path: '',
    component: OrdenPagoPage
  }
];

@NgModule({
  imports: [
    NgXCreditCardsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OrdenPagoPage]
})
export class OrdenPagoPageModule { }
