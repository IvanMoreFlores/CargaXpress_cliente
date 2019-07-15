import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NotificacionService } from '../../services/notificacion/notificacion.service';
import { VerMasPage } from '../ver-mas/ver-mas.page';

@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.page.html',
  styleUrls: ['./notificacion.page.scss'],
})
export class NotificacionPage implements OnInit {
  sin_datos: Boolean = true;
  con_datos: Boolean = false;
  cero_datos: Boolean = false;
  notificaciones: any[] = [];
  // ngStyle: string = '--background:white';
  ngStyle: { 'background': 'white !important'; };
  constructor(private menu: MenuController,
    public NvCtrl: NavController,
    public router: Router,
    public _noti: NotificacionService,
    public alertController: AlertController,
    public modalController: ModalController) {
    this.menu.swipeEnable(true, 'custom');
    this.menu.enable(false, 'custom');
  }

  ngOnInit() {
    this._noti.listar_notificaciones().subscribe((data => {
      if (data.notifications.length > 0) {
        this.notificaciones = data.notifications;
        this.cero_datos = false;
        this.con_datos = true;
        this.sin_datos = false;
      } else {
        this.cero_datos = true;
        this.sin_datos = false;
      }
    }), error => {
      this.respuestaFail(error.json());
    });
  }

  refrescar() {
    this.cero_datos = false;
    this.con_datos = false;
    this.sin_datos = true;
    this._noti.listar_notificaciones().subscribe((data => {
      if (data.notifications.length > 0) {
        this.notificaciones = data.notifications;
        // this.pedidos = data.orders;
        this.cero_datos = false;
        this.con_datos = true;
        this.sin_datos = false;
      } else {
        this.cero_datos = true;
        this.sin_datos = false;
      }
    }), error => {
      this.respuestaFail(error.json());
    });
  }

  doRefresh(event: any) {
    this.cero_datos = false;
    this.sin_datos = true;
    this.con_datos = false;
    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 2000);
  }

  async respuestaFail(error: any) {
    if (error.msg) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: error.msg,
        buttons: ['OK']
      });
      await alert.present();
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Falla al intentar comunicarse con el servidor',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  openFirst() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  async abrir_modal(notificacion: any) {
    if (notificacion.message === 'Han realizado una contraoferta.') {
      const modal = await this.modalController.create({
        component: VerMasPage,
        componentProps: { id: notificacion.types[1]['id'], id_oferta: notificacion.types[0]['id'] }
      });
      return await modal.present();
    } else {
      this.router.navigate(['/detail', notificacion.types[0]['id']]);
    }
  }

  ionViewDidEnter() {
    this.refrescar();
  }



}
