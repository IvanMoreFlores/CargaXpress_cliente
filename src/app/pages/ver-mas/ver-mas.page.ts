import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController, ModalController, NavParams } from '@ionic/angular';
import { NotificacionService } from '../../services/notificacion/notificacion.service';
import * as moment from 'moment';

@Component({
  selector: 'app-ver-mas',
  templateUrl: './ver-mas.page.html',
  styleUrls: ['./ver-mas.page.scss'],
})
export class VerMasPage implements OnInit {

  offers: any = [];
  ultimo: any = {};
  constructor(public modalController: ModalController,
    private navParams: NavParams,
    public _noti: NotificacionService) { }

  ngOnInit() {
    console.log(this.navParams.get('id_oferta'));
    console.log(this.navParams.get('id'));
    this._noti.listar_historial(this.navParams.get('id_oferta'), this.navParams.get('id')).subscribe((data) => {
      this.offers = data.offers;
      this.ultimo = this.offers[this.offers.length - 1];
      console.log(this.offers);
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

  doRefresh(event) {
    console.log('Begin async operation');
    setTimeout(() => {
      console.log('Async operation has ended');
      this.ngOnInit();
      event.target.complete();
    }, 2000);
  }

}
