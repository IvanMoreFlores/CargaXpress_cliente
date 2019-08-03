import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../../services/servicio/servicio.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import * as moment from 'moment';

// Modal
import { PedidoHistorialPage } from '../pedido-historial/pedido-historial.page';
import { VerMasPage } from '../ver-mas/ver-mas.page';

@Component({
  selector: 'app-pedido-detalle',
  templateUrl: './pedido-detalle.page.html',
  styleUrls: ['./pedido-detalle.page.scss'],
})
export class PedidoDetallePage implements OnInit {

  pedido: any = {};
  button_pedido: Boolean = false;
  button_servicio: Boolean = false;
  button_ofertar: Boolean = false;
  button_historial: Boolean = false;
  of = this.activatedRoute.snapshot.paramMap.get('of');
  constructor(private router: Router,
    public service: ServicioService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public modalController: ModalController) {
    console.log(this.activatedRoute.snapshot.paramMap.get('id'));
    this.activatedRoute.snapshot.paramMap.get('of') === '0' ? this.button_pedido = true : this.button_servicio = true;
  }

  async ngOnInit() {
    const loading = await this.loadingController.create({
      message: 'Espere por favor...'
    });
    await loading.present();
    this.service.order_id(this.activatedRoute.snapshot.paramMap.get('id')).subscribe((data => {
      this.pedido = data;
      this.service.offer_id(this.activatedRoute.snapshot.paramMap.get('id')).subscribe((async datos => {
        console.log('Aqui :');
        console.log(datos);
        this.service.historial_oferta(this.activatedRoute.snapshot.paramMap.get('id'), datos._id).subscribe((async dato => {
          dato.offers.length > 0 ? this.button_historial = true : this.button_ofertar = true;
          loading.dismiss();
        }), error => {
          loading.dismiss();
          this.respuestaFail(error.json());
        });
      }), error => {
        this.button_ofertar = true;
        loading.dismiss();
        this.respuestaFail(error.json());
      });
    }), error => {
      loading.dismiss();
      this.respuestaFail(error.json());
    });
  }

  click_pedido() {
    this.navCtrl.pop();
  }

  async var_mas(id: any) {
    this.service.offer_id(id).subscribe((async data => {
      console.log(data);
      const modal = await this.modalController.create({
        component: VerMasPage,
        componentProps: { id: data._id, id_oferta: id }
      });
      return await modal.present();
    }), error => {
      this.respuestaFail(error.json());
    });
  }

  async pedido_historial(id: any) {
    this.service.offer_id(id).subscribe((async data => {
      console.log(data);
      const modal = await this.modalController.create({
        component: PedidoHistorialPage,
        componentProps: { id: data._id, id_oferta: id }
      });
      return await modal.present();
    }), error => {
      this.respuestaFail(error.json());
    });
  }

  devolver_fecha(fecha: any) {
    return (moment(fecha).format('DD-MM-YYYY'));
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

  devolver_fecha_otra(fecha: any) {
    // min: '2017-03-01',
    return (moment(fecha).format('YYYY-MM-DD'));
  }

  devolver_otra() {
    // min: '2017-03-01',
    return (moment().format('YYYY-MM-DD'));
  }

  async presentAlertPrompt(fecha: any, id: any) {
    const alert = await this.alertController.create({
      header: 'Ofertar',
      message: '<strong>Monto de oferta (S/.)</strong>',
      backdropDismiss: false,
      inputs: [
        // input date without min nor max
        {
          name: 'oferta',
          type: 'number',
          min: 1,
          max: 10
        },
        // input date with min & max
        {
          name: 'fecha',
          type: 'date',
          min: this.devolver_otra(),
          max: this.devolver_fecha_otra(fecha),
          placeholder: 'DD/MM/YYYY'
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
            // console.log(data);
            const dato = {
              type: 1,
              amount: data.oferta,
              owner: localStorage.getItem('id'),
              deliveryDate: data.fecha
            };
            this.ofertar(dato, id);
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
      message: 'Ofertando...',
    });
    await loading.present();
    this.service.nueva_oferta(data, id).subscribe((dato => {
      loading.dismiss();
      console.log(dato);
      this.successAlert(data.msg, 'Registrado');
    }), error => {
      loading.dismiss();
      console.log(error);
      this.respuestaFail(error.json());
    });
  }

  // async errorAlert(err: any) {
  //   this.loadingController.dismiss();
  //   const alert = await this.alertController.create({
  //     backdropDismiss: false,
  //     header: 'Error',
  //     subHeader: 'error al registrar chofer',
  //     message: err,
  //     buttons: ['OK']
  //   });
  //   await alert.present();
  // }

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
            this.click_pedido();
          }
        }
      ]
    });
    await alert.present();
  }

}
