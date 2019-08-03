import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController, ModalController, NavParams } from '@ionic/angular';
import { NotificacionService } from '../../services/notificacion/notificacion.service';
import * as moment from 'moment';
import { FormGroup, FormArray, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CreditCardValidator } from 'ngx-credit-cards';

@Component({
  selector: 'app-orden-pago',
  templateUrl: './orden-pago.page.html',
  styleUrls: ['./orden-pago.page.scss'],
})
export class OrdenPagoPage implements OnInit {
  formGroup: FormGroup;
  total: any;
  constructor(public modalController: ModalController,
    private navParams: NavParams,
    public formBuilder: FormBuilder) {
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
  }

  cerrar() {
    this.modalController.dismiss();
  }

}
