import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController, ModalController, NavParams } from '@ionic/angular';
import { NotificacionService } from '../../services/notificacion/notificacion.service';
import * as moment from 'moment';
import { FormGroup, FormArray, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CreditCardValidator } from 'ngx-credit-cards';
import { OrderService } from '../../services/order/order.service';

@Component({
  selector: 'app-orden-pago',
  templateUrl: './orden-pago.page.html',
  styleUrls: ['./orden-pago.page.scss'],
})
export class OrdenPagoPage implements OnInit {
  formGroup: FormGroup;
  total: any;
  formulario: any;
  aditionalServices: any[];
  constructor(public modalController: ModalController,
    private navParams: NavParams,
    public formBuilder: FormBuilder,
    public _order: OrderService,
    public alertController: AlertController,
    public loadingController: LoadingController) {
    this.formBuilder = new FormBuilder();
    this.formGroup = this.formBuilder.group({
      cardNumber: ['', [CreditCardValidator.validateCardNumber]],
      cardExpDate: ['', [CreditCardValidator.validateCardExpiry]],
      cardCvv: ['', [CreditCardValidator.validateCardCvc]],
      cardName: ['', Validators.compose([Validators.required])],
      cardLastName: ['', Validators.compose([Validators.required])],
      cardEmail: ['', Validators.compose([Validators.required, Validators.email])]
    });
  }

  ngOnInit() {
    this.total = this.navParams.get('total');
    console.log(this.navParams.get('total'));
    console.log(this.navParams.get('orderId'));
    console.log(this.navParams.get('offerHistoryId'));
    console.log(this.navParams.get('aditionalServices'));
    this.aditionalServices = this.navParams.get('aditionalServices');
    this.aditionalServices = this.aditionalServices.map(item => {
      return { quantity: item.monto, aditionalService: item._id };
    });
    console.log(this.aditionalServices);
  }

  async click_pagar() {
    this.formulario = {
      token: localStorage.getItem('token'),
      amount: this.total,
      email: this.formGroup.value.cardEmail,
      aditionalServices: this.aditionalServices
    };
    console.log(this.formulario);
    const loading = await this.loadingController.create({
      message: 'Pagando la orden...',
    });
    await loading.present();
    this._order.pagar_orden(this.formulario, this.navParams.get('orderId'), this.navParams.get('offerHistoryId')).subscribe((dato => {
      loading.dismiss();
      console.log(dato);
      this.successAlert(dato.msg, 'Pagado');
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

  cerrar() {
    this.modalController.dismiss();
  }

}
