import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { LoadingController, ModalController, NavParams } from '@ionic/angular';
import { OrderService } from '../../services/order/order.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modal-detail',
  templateUrl: './modal-detail.page.html',
  styleUrls: ['./modal-detail.page.scss'],
})
export class ModalDetailPage implements OnInit {
  title: String = '';
  servicios: any = [];
  constructor(private router: Router,
    public alertController: AlertController,
    public NvCrtl: NavController,
    public _activate: ActivatedRoute,
    public _order: OrderService,
    public platform: Platform,
    public modalController: ModalController,
    private navParams: NavParams) {
    this.title = this.navParams.get('servicio');
  }

  ngOnInit() {
    this._order.traer_empresas(this.navParams.get('id')).subscribe((data => {
      this.servicios = data.services;
      console.log(data);
      console.log(data.services);
      console.log(this.servicios);
    }));
  }

  cerrar(monto: number) {
    this.modalController.dismiss({
      '_id': 0,
      'price': 0,
      'cuadra': monto,
    });
  }

  click_empresa(id, name) {
    if (this.navParams.get('id') === 1 || this.navParams.get('id') === 2) {
      this.presentAlertPrompt(id, name);
    } else {
      this.presentAlertConfirm(id, name);
    }
    // console.log(this.navParams.get('id'));
  }

  async presentAlertPrompt(id, name) {
    const alert = await this.alertController.create({
      header: 'Mensaje',
      message: '<b>Digite la cantidad de cuadrillas</b>',
      backdropDismiss: false,
      inputs: [
        {
          name: 'monto',
          type: 'number'
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
          text: 'Agregar',
          handler: (data) => {
            console.log(data);
            console.log('Confirm Ok');
            this.modalController.dismiss({
              '_id': id,
              'price': name,
              'cuadra': parseInt(data.monto),
              'monto': parseInt(data.monto) * name,
              'tipo': 1
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertConfirm(id, name) {
    const alert = await this.alertController.create({
      header: 'Mensaje',
      backdropDismiss: false,
      message: '<b>Desea agregar este servicio a su pedido?</b>',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Agregar',
          handler: () => {
            console.log('Confirm Okay');
            this.modalController.dismiss({
              '_id': id,
              'price': name,
              'tipo': 2
            });
          }
        }
      ]
    });

    await alert.present();
  }


}
