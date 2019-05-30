import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController, AlertController } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Platform, IonRouterOutlet } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { OrderService } from '../../services/order/order.service';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonRouterOutlet) routerOutlet: IonRouterOutlet;
  customBackActionSubscription: Subscription;
  sin_datos: Boolean;
  con_datos: Boolean;
  cero_datos: Boolean;
  page: number;
  pedidos: any = [];
  constructor(private router: Router,
    private menu: MenuController,
    public platform: Platform,
    public NvCtrl: NavController,
    public _order: OrderService,
    public alertController: AlertController,
    public toastController: ToastController) {
    this.menu.swipeEnable(true, 'custom');
  }


  ngOnInit() {
    this.cero_datos = false;
    this.con_datos = false;
    this.sin_datos = true;
    this._order.listar_orden_id().subscribe((data => {
      if (data.orders.length > 0) {
        console.log(data);
        this.page = data.page;
        this.pedidos = data.orders;
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

  async respuestaFail(error: any) {
    if (error.msg) {
      const alert = await this.alertController.create({
        backdropDismiss: false,
        header: 'Error',
        message: error.msg,
        buttons: ['OK']
      });
      await alert.present();
    } else {
      const alert = await this.alertController.create({
        backdropDismiss: false,
        header: 'Error',
        message: 'Falla al intentar comunicarse con el servidor',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  doRefresh(event: any) {
    this.cero_datos = false;
    this.sin_datos = !this.sin_datos;
    this.con_datos = !this.con_datos;
    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 2000);
  }

  detail(id: any) {
    this.router.navigate(['/detail', id]);
  }

  new_order() {
    this.router.navigateByUrl('/modal-pedido');
  }

  openFirst() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  refrescar() {
    this.cero_datos = false;
    this.con_datos = false;
    this.sin_datos = true;
    this._order.listar_orden_id().subscribe((data => {
      if (data.orders.length > 0) {
        this.page = data.page;
        this.pedidos = data.orders;
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

  ionViewDidEnter() {
    this.refrescar();
    this.platform.backButton.subscribeWithPriority(0, () => {
      if (this.routerOutlet && this.routerOutlet.canGoBack()) {
        this.routerOutlet.pop();
      } else if (this.router.url === '/tabs/Pedidos' || this.router.url === '/tabs/Notificaciones' || this.router.url === '/tabs/Perfil') {
        // or if that doesn't work, try
        // navigator['app'].exitApp();
        this.presentAlertConfirm();
      } else {
        // alert('Exit');
        this.routerOutlet.pop();
      }
    });
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      backdropDismiss: false,
      header: 'Salir',
      message: 'Desea salir de <strong>CargaXpress</strong>?',
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'SI',
          handler: () => {
            navigator['app'].exitApp();
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  siguiente(event) {
    this._order.listar_orden_id_pag(this.page + 1).subscribe((data => {
      if (data.orders.length > 0) {
        this.page = data.page;
        this.pedidos = this.pedidos.concat(data.orders);
        console.log(data.orders);
        event.target.complete();
      } else {
        event.target.complete();
        this.presentToast();
      }
    }), error => {
      this.respuestaFail(error.json());
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Sin datos que mostrar',
      duration: 2000
    });
    toast.present();
  }


}
