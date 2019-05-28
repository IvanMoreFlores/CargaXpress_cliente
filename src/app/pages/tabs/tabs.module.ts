import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../guards/auth/auth.guard';
import { IonicModule } from '@ionic/angular';
import { TabsPage } from './tabs.page';
const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'Pedidos',
        loadChildren: '../pedidos/pedidos.module#PedidosPagePageModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'Notificaciones',
        loadChildren: '../notificacion/notificacion.module#NotificacionPageModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'Perfil',
        loadChildren: '../profile/profile.module#ProfilePageModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'InicioChofer',
        loadChildren: '../home-chofer/home-chofer.module#HomeChoferPageModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'Servicios',
        loadChildren: '../servicios/servicios.module#ServiciosPageModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'Conductores',
        loadChildren: '../chofer/chofer.module#ChoferPageModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'PerfilTransp',
        loadChildren: '../profile-transp/profile-transp.module#ProfileTranspPageModule',
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule { }
