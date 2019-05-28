import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SubirCertificadoPage } from './subir-certificado.page';

const routes: Routes = [
  {
    path: '',
    component: SubirCertificadoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SubirCertificadoPage]
})
export class SubirCertificadoPageModule {}
