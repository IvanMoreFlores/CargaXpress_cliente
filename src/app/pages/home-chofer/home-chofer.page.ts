import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { MenuController, AlertController } from '@ionic/angular';
import { HomeService } from '../../services/home/home.service';
import { OrderService } from './../../services/order/order.service';
import { ToastController } from '@ionic/angular';
import * as moment from 'moment';
import { Socket } from 'ngx-socket-io';
import { NotificacionService } from '../../services/notificacion/notificacion.service';
// Modal

@Component({
  selector: 'app-home-chofer',
  templateUrl: './home-chofer.page.html',
  styleUrls: ['./home-chofer.page.scss'],
})
export class HomeChoferPage implements OnInit {

  // categorias: Array<Object> = [];
  // subcategorias: Array<Object> = [];
  // ordenes: Array<Object> = [];
  categorias: any;
  subcategorias: any;
  ordenes: any;
  page: number;
  div_select: Boolean = false;
  sin_datos: Boolean = true;
  con_datos: Boolean = false;
  cero_datos: Boolean = false;
  contador: number;

  constructor(private router: Router,
    public modalController: ModalController,
    private menu: MenuController,
    private _home: HomeService,
    private _orden: OrderService,
    public alertController: AlertController,
    public toastController: ToastController,
    public _noti: NotificacionService,
    private socket: Socket) {
    this.listarOrder();
  }

  ngOnInit() {
    this.socket.connect();
    this._home.listar_categoria().subscribe((data => {
      this.categorias = data.categories;
      console.log(this.categorias);
    }), error => {
      this.respuestaFail(error.json());
    });

    this.socket.fromEvent('NEW_ORDER').subscribe(NEW_ORDER => {
      console.log('Entro al socket');
      console.log(NEW_ORDER);
      this.ordenes.push(NEW_ORDER);
    });
  }

  devolver_fecha(fecha: any) {
    return (moment(fecha).format('DD-MM-YYYY'));
  }

  ionViewDidEnter() {
    this._noti.listar_notificaciones().subscribe((data) => {
      this.contador = data.nrCount;
    });
  }

  click_notificacion() {
    this.router.navigateByUrl('/trans-noti');
  }

  public changeEnvironment(event): void {
    this.div_select = false;
    console.log(JSON.stringify(event.detail.value));
    this.traer_subc(event.detail.value);
  }

  traer_subc(_id) {
    this._home.listar_subcategorias(_id).subscribe((data) => {
      this.subcategorias = data.subcategories;
      this.div_select = !this.div_select;
      console.log(data);
    });
  }

  click_pedido(id: any) {
    this.router.navigate(['/pedido-detalle', id, 0]);
    // this.router.navigate(['/pedido-detalle', id]);
  }

  presentModal() {

  }

  openFirst() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  list_order() {
    this.router.navigateByUrl('/listar-pedido');
  }

  modalSubcat(id: any) {
    this.router.navigateByUrl('/detail');
  }

  async respuestaFail(error: any) {
    console.log(error);
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

  listarOrder() {
    this._orden.listar_orden().subscribe((data => {
      console.log(data.orders.length);
      if (data.orders.length > 0) {
        this.page = data.page;
        this.ordenes = data.orders;
        this.con_datos = !this.con_datos;
        this.sin_datos = !this.sin_datos;
      } else {
        this.cero_datos = !this.cero_datos;
        this.sin_datos = !this.sin_datos;
      }
    }), error => {
      this.respuestaFail(error.json());
    });
  }

  doRefresh(event: any) {
    this.sin_datos = true;
    this.con_datos = false;
    this.cero_datos = false;
    setTimeout(() => {
      this.listarOrder();
      event.target.complete();
    }, 2000);
  }

  siguiente(event) {
    this._orden.listar_orden_id_pag(this.page + 1).subscribe((data => {
      if (data.orders.length > 0) {
        this.page = data.page;
        this.ordenes = this.ordenes.concat(data.orders);
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
