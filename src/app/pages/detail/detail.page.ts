import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CulqiService } from './../../services/culqi/culqi.service';
import { Events } from '@ionic/angular';
import { LoadingController, AlertController, ModalController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order/order.service';
import { VerMasPage } from '../ver-mas/ver-mas.page';
import * as moment from 'moment';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  public category: String = 'detalle';
  public categories: Array<string> = ['detalle', 'ofertas'];
  loading: LoadingController;
  div_detalle: Boolean = false;
  fab_editar: Boolean = false;
  detalle: any = {
    aditionalRequirements: null,
    aditionalServices: [],
    canDivide: null,
    canNegotiate: null,
    canSubcontratable: null,
    category: [],
    code: null,
    createdAt: null,
    deliveryEnterprise: null,
    deliveryMaxDate: null,
    deliveryMaxHour: null,
    destinationAnswers: [],
    elements: [],
    endDate: null,
    endLocation: {},
    endPlace: null,
    initLocation: {},
    initPlace: null,
    owner: null,
    receptionAnswers: [],
    service: null,
    status: null,
    subcategory: {},
    type: null,
    typeStatus: null,
    updatedAt: null,
    __v: null,
    _id: null
  };
  ofertas: any[] = [];

  constructor(private router: Router,
    public _culqi: CulqiService,
    public events: Events,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public activatedRoute: ActivatedRoute,
    public _orden: OrderService,
    public modalController: ModalController,
    public NvCtrl: NavController) {
  }

  async ngOnInit() {
    const loading = await this.loadingCtrl.create({
      message: 'Procesando informacion...',
    });
    await loading.present();
    this._orden.detalle_order(this.activatedRoute.snapshot.paramMap.get('id')).subscribe((data => {
      this.detalle = data;
      this.fab_editar = true;
      this.div_detalle = true;
      this.loadingCtrl.dismiss();
      console.log(data);
    }));
    // const loading = await this.loadingCtrl.create({
    //   message: 'Procesando informacion...',
    // });
    // await loading.present();
    // await this.loadingCtrl.dismiss().then(() => {
    //   this._culqi.initCulqi();
    // });

    // this.events.subscribe('on_event_loading_pago', (data) => {
    //   console.log('on_event_loading_pago ' + JSON.stringify(data));
    //   this.LoadingProcess();
    // });

    // this.events.subscribe('on_event_pago', (data) => {
    //   console.log('on_event_pago ' + JSON.stringify(data));
    //   this.loadingCtrl.dismiss().then(() => {
    //     this.AlertExito(data);
    //   });
    // });

    // this.events.subscribe('on_event_pago_error', (error: any) => {
    //   console.log('on_event_pago_error ' + JSON.stringify(error));
    //   this.loadingCtrl.dismiss().then(() => {
    //     this.AlertError(error);
    //   });
    // });
  }

  devolver_fech(fecha: any) {
    return (moment(fecha).format('DD-MM-YYYY'));
  }

  listar_detalle() {
    this.fab_editar = true;
  }

  async listar_ofertas() {
    this.fab_editar = false;
    const loading = await this.loadingCtrl.create({
      message: 'Listando ofertas...',
    });
    await loading.present();
    this._orden.listar_ofertas(this.activatedRoute.snapshot.paramMap.get('id')).subscribe((data) => {
      console.log(data);
      this.ofertas = data.offers;
      this.loadingCtrl.dismiss();
    }, (err) => {
      // error
      console.log(err);
      this.loadingCtrl.dismiss();
      const msg = JSON.parse(err._body);
      this.errorAlert(msg.msg, 'Error al listar las ofertas');
    });
  }

  async click_Contraofertar(monto: number, _id: any, id: any) {
    console.log(this.activatedRoute.snapshot.paramMap.get('id'));
    console.log(id);
    const alert = await this.alertCtrl.create({
      header: 'Ofertar',
      message: 'Contraoferta del ofertante S/.' + monto + ' <br/> Monto de oferta (S/.)',
      backdropDismiss: false,
      inputs: [
        {
          name: 'monto',
          type: 'number',
          min: 0,
          max: 10000
        }
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
          handler: (dato) => {
            const datos = {
              // bidder: bidder,
              owner: localStorage.getItem('id'),
              amount: dato.monto,
              type: 2,
              offerHistory: _id
            };
            this.confirmar(datos, id);
          }
        }
      ]
    });
    await alert.present();
  }

  async confirmar(datos: any, id: any) {
    console.log(datos, id);
    const loading = await this.loadingCtrl.create({
      message: 'Espere...',
    });
    await loading.present();
    this._orden.nueva_contra(datos, id).subscribe((data) => {
      // success
      this.loadingCtrl.dismiss();
      console.log(data);
      this.successAlert('Oferta registrada', 'Registrada');
    }, (err) => {
      // error
      this.loadingCtrl.dismiss();
      const msg = JSON.parse(err._body);
      this.errorAlert(msg.msg, 'error al registrar la contraoferta');
    });
  }

  async aceptarAlter(lastAmount: number, id: number, oid: number) {
    const alert = await this.alertCtrl.create({
      backdropDismiss: false,
      header: 'Aceptar',
      subHeader: 'Aceptar oferta',
      message: '<b>¿ Esta seguro de aceptar la ultima oferta (' + lastAmount + ') ?</b>',
      buttons: [{
        text: 'NO',
        role: 'cancel',
        handler: () => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'SI',
        handler: () => {
          console.log('Confirm Okay');
          this.presentLoading(id, oid);
        }
      }]
    });
    await alert.present();
  }

  async presentLoading(id, oid) {
    const loading = await this.loadingCtrl.create({
      message: 'Aceptando oferta',
    });
    await loading.present();
    this._orden.aceptar_contra(id, oid).subscribe((data) => {
      // success
      this.loadingCtrl.dismiss();
      console.log(data);
      this.successAlert('Oferta aceptada', 'Aceptado');
    }, (err) => {
      // error
      this.loadingCtrl.dismiss();
      const msg = JSON.parse(err._body);
      this.errorAlert(msg.msg, 'error al aceptar la oferta');
    });
  }

  async cancelartAlert(lastAmount: number) {
    const alert = await this.alertCtrl.create({
      backdropDismiss: false,
      header: 'Cancelar',
      subHeader: 'Cancelar oferta',
      message: '<b>¿ Esta seguro de cancelar la oferta (' + lastAmount + ') ?</b>',
      buttons: [{
        text: 'NO',
        role: 'cancel',
        handler: () => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'SI',
        handler: () => {
          console.log('Confirm Okay');
        }
      }]
    });
    await alert.present();
  }

  async successAlert(body: any, inf: any) {
    console.log('Mensaje : ' + body);
    this.loadingCtrl.dismiss();
    const alert = await this.alertCtrl.create({
      header: inf,
      backdropDismiss: false,
      subHeader: body,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.listar_ofertas();
            this._orden.detalle_order(this.activatedRoute.snapshot.paramMap.get('id')).subscribe((data => {
              this.detalle = data;
              this.fab_editar = true;
              this.div_detalle = true;
            }));
          }
        }
      ]
    });
    await alert.present();
  }

  async errorAlert(err: any, msg: any) {
    this.loadingCtrl.dismiss();
    const alert = await this.alertCtrl.create({
      backdropDismiss: false,
      header: 'Error',
      subHeader: msg,
      message: err,
      buttons: ['OK']
    });
    await alert.present();
  }

  click_ofertar() {
  }


  async var_mas(id: any) {
    const modal = await this.modalController.create({
      component: VerMasPage,
      componentProps: { id: id, id_oferta: this.activatedRoute.snapshot.paramMap.get('id') }
    });
    return await modal.present();
  }

  /// Pasado ///

  async LoadingProcess() {
    const loading = await this.loadingCtrl.create({
      message: 'Validando pago...'
    });
    await loading.present();
  }

  async AlertError(error: any) {
    const alert = await this.alertCtrl.create({
      header: error.error.merchant_message,
      subHeader: error.error.user_message,
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          handler: () => {
            // Haga algo con el error
          }
        }
      ]
    });
    await alert.present();
  }

  async AlertExito(data: any) {
    const alert = await this.alertCtrl.create({
      header: data.outcome.user_message,
      subHeader: data.outcome.merchant_message,
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          handler: () => {
            // Haga algo con el error
          }
        }
      ]
    });
    await alert.present();
  }

  async pago_culqi() {
    // const loading = await this.loadingCtrl.create({
    //   message: 'Procesando informacion...',
    // });
    // await loading.present();
    // await this._culqi.cfgFormulario('Pago por servicio', 100 * 100);
    // await this.loadingCtrl.dismiss().then(() => {
    //   this._culqi.open();
    // });
  }


  click_modalNego(id: any) {
    this.router.navigate(['/modal-nego', id]);
  }

  click_modalMapa() {
    this.router.navigateByUrl('/mapa');
  }

  editar_orden(id: any) {
    this.router.navigate(['/edit-pedido', id]);
  }

}
