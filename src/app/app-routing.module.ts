import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'splash', pathMatch: 'full' },
  {
    path: 'splash',
    loadChildren: './pages/splash/splash.module#SplashPageModule'
  },
  {
    path: 'login',
    loadChildren: './pages/login/login.module#LoginPageModule'
  },
  {
    path: 'recover',
    loadChildren: './pages/recover/recover.module#RecoverPageModule'
  },
  {
    path: 'sign',
    loadChildren: './pages/sign/sign.module#SignPageModule'
  },
  {
    path: 'register/:id',
    loadChildren: './pages/register/register.module#RegisterPageModule'
  },
  {
    path: 'welcome',
    loadChildren: './pages/welcome/welcome.module#WelcomePageModule', canActivate: [AuthGuard]
  },
  {
    path: 'detail/:id',
    loadChildren: './pages/detail/detail.module#DetailPageModule', canActivate: [AuthGuard]
  },
  {
    path: 'edit-pedido/:id',
    loadChildren: './pages/edit-pedido/edit-pedido.module#EditPedidoPageModule'
  },
  {
    path: 'modal-nego/:orden/:oferta',
    loadChildren: './pages/modal-nego/modal-nego.module#ModalNegoPageModule', canActivate: [AuthGuard]
  },
  {
    path: 'modal-detail/',
    loadChildren: './pages/modal-detail/modal-detail.module#ModalDetailPageModule', canActivate: [AuthGuard]
  },
  {
    path: 'modal-pedido',
    loadChildren: './pages/modal-pedido/modal-pedido.module#ModalPedidoPageModule', canActivate: [AuthGuard]
  },
  {
    path: 'mapa',
    loadChildren: './pages/mapa/mapa.module#MapaPageModule', canActivate: [AuthGuard]
  },
  {
    path: 'tabs',
    loadChildren: './pages/tabs/tabs.module#TabsPageModule', canActivate: [AuthGuard]
  },
  {
    path: 'subir-certificado',
    loadChildren: './pages/subir-certificado/subir-certificado.module#SubirCertificadoPageModule'
  },
  {
    path: 'new-driver/:id',
    loadChildren: './pages/new-driver/new-driver.module#NewDriverPageModule'
  },
  {
    path: 'buscador-lugar',
    loadChildren: './pages/buscador-lugar/buscador-lugar.module#BuscadorLugarPageModule'
  },
  {
    path: 'ver-mas',
    loadChildren: './pages/ver-mas/ver-mas.module#VerMasPageModule'
  },
  {
    path: 'edit-perfil/:id',
    loadChildren: './pages/edit-perfil/edit-perfil.module#EditPerfilPageModule'
  },
  {
    path: 'servicio-detalle/:id',
    loadChildren: './pages/servicio-detalle/servicio-detalle.module#ServicioDetallePageModule'
  },
  {
    path: 'pedido-detalle/:id/:of',
    loadChildren: './pages/pedido-detalle/pedido-detalle.module#PedidoDetallePageModule'
  },
  {
    path: 'pedido-seguimiento',
    loadChildren: './pages/pedido-seguimiento/pedido-seguimiento.module#PedidoSeguimientoPageModule'
  },
  {
    path: 'pedido-asignar',
    loadChildren: './pages/pedido-asignar/pedido-asignar.module#PedidoAsignarPageModule'
  },
  {
    path: 'pedido-historial',
    loadChildren: './pages/pedido-historial/pedido-historial.module#PedidoHistorialPageModule'
  },
  {
    path: 'orden-pago',
    loadChildren: './pages/orden-pago/orden-pago.module#OrdenPagoPageModule'
  },
  {
    path: 'servicio-asignar/:id',
    loadChildren: './pages/servicio-asignar/servicio-asignar.module#ServicioAsignarPageModule'
  },
  {
    path: 'servicio-chofer',
    loadChildren: './pages/servicio-chofer/servicio-chofer.module#ServicioChoferPageModule'
  },
  {
    path: 'servicio-seguimiento/:id',
    loadChildren: './pages/servicio-seguimiento/servicio-seguimiento.module#ServicioSeguimientoPageModule'
  },
  {
    path: 'trans-noti',
    loadChildren: './pages/trans-noti/trans-noti.module#TransNotiPageModule'
  },
  { path: '**', loadChildren: './pages/splash/splash.module#SplashPageModule' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
