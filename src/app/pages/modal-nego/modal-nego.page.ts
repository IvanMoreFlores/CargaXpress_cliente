import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-modal-nego',
  templateUrl: './modal-nego.page.html',
  styleUrls: ['./modal-nego.page.scss'],
})
export class ModalNegoPage implements OnInit {

  constructor(public alertController: AlertController) { }

  ngOnInit() {
  }

  async click_Contraofertar() {
    const alert = await this.alertController.create({
      header: 'Contraofertar',
      message: 'Monto a ofertar',
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
          handler: (data) => {
            console.log(data);
          }
        }
      ]
    });

    await alert.present();
  }

}
