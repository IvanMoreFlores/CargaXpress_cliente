import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController, ModalController, NavParams, NavController } from '@ionic/angular';
import { NotificacionService } from '../../services/notificacion/notificacion.service';
import { OrderService } from '../../services/order/order.service';
import { Socket } from 'ngx-socket-io';
import * as moment from 'moment';

@Component({
  selector: 'app-pedido-historial',
  templateUrl: './pedido-historial.page.html',
  styleUrls: ['./pedido-historial.page.scss'],
})
export class PedidoHistorialPage implements OnInit {

  offers: any = [];
  ultimo: any = {};
  id_owner = localStorage.getItem('id');
  canNegotiate = this.navParams.get('canNegotiate');
  status: any = this.navParams.get('status');
  constructor(public modalController: ModalController,
    private navParams: NavParams,
    public _noti: NotificacionService,
    public _order: OrderService,
    public alertController: AlertController,
    public loadingController: LoadingController,
    private navCtrl: NavController,
    private socket: Socket) { }

  ngOnInit() {
    this.socket.connect();
    console.log(this.navParams.get('id_oferta'));
    console.log(this.navParams.get('id'));
    this._noti.listar_historial(this.navParams.get('id_oferta'), this.navParams.get('id')).subscribe((data) => {
      this.offers = data.offers;
      this.ultimo = this.offers[this.offers.length - 1];
      console.log(this.offers);
      console.log(this.ultimo);
      // console.log(this.offers[this.offers.length - 1]);
      // var ultimo = this.offers[this.offers.length - 1];
    });
  }

  cerrar() {
    this.modalController.dismiss();
  }

  devolver_fecha(fecha: any) {
    return (moment(fecha).format('DD-MM-YYYY, h:mm:ss a'));
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'Ofertar',
      subHeader: 'Contraoferta del cliente ' + this.ultimo.amount,
      message: '<strong> Monto de oferta (S/.) </strong>',
      backdropDismiss: false,
      inputs: [
        {
          name: 'oferta',
          type: 'number',
          min: -5,
          max: 10
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirmar',
          handler: (data) => {
            console.log('Confirm Ok');
            const dato = {
              type: 2,
              amount: data.oferta,
              owner: localStorage.getItem('id'),
              offerHistory: this.ultimo.offerHistory
            };
            this.ofertar(dato, this.navParams.get('id_oferta'));
          }
        }
      ]
    });
    await alert.present();
  }

  async ofertar(data: any, id: any) {
    // console.log(data);
    // console.log(id);
    const loading = await this.loadingController.create({
      message: 'Negociando...',
    });
    await loading.present();
    this._order.nueva_contra(data, id).subscribe((dato => {
      loading.dismiss();
      console.log(dato);
      this.successAlert(dato.msg, 'Registrado');
    }), error => {
      loading.dismiss();
      console.log(error);
      this.respuestaFail(error.json());
    });
  }

  async successAlert(body: any, inf: any) {
    console.log('Mensaje : ' + body);
    this.loadingController.dismiss();
    const alert = await this.alertController.create({
      header: inf,
      backdropDismiss: false,
      subHeader: body,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.modalController.dismiss();
          }
        }
      ]
    });
    await alert.present();
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

  doRefresh(event) {
    console.log('Begin async operation');
    setTimeout(() => {
      console.log('Async operation has ended');
      this.ngOnInit();
      event.target.complete();
    }, 2000);
  }

  ionViewWillLeave() {
    this.socket.disconnect();
  }

}
