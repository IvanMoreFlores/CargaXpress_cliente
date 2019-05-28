import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController, ModalController, NavParams } from '@ionic/angular';
import { NotificacionService } from '../../services/notificacion/notificacion.service';

@Component({
  selector: 'app-ver-mas',
  templateUrl: './ver-mas.page.html',
  styleUrls: ['./ver-mas.page.scss'],
})
export class VerMasPage implements OnInit {

  offers: any = [];
  constructor(public modalController: ModalController,
    private navParams: NavParams,
    public _noti: NotificacionService) { }

  ngOnInit() {
    console.log(this.navParams.get('id_oferta'));
    console.log(this.navParams.get('id'));
    this._noti.listar_historial(this.navParams.get('id_oferta'), this.navParams.get('id')).subscribe((data) => {
      this.offers = data.offers;
      console.log(data);
    });
  }

  cerrar() {
    this.modalController.dismiss();
  }

  devolver_fecha(fecha: any) {
    const hora = fecha.slice(11, 16);
    const fecha_ = fecha.slice(0, 10);
    return (fecha_ + ' ' + hora);
  }

}
