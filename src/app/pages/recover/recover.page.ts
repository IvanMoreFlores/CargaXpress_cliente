import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController, } from '@ionic/angular';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.page.html',
  styleUrls: ['./recover.page.scss'],
})
export class RecoverPage implements OnInit {

  corre: String = '';
  constructor(public alertController: AlertController,
    public _login: LoginService,
    public loadingController: LoadingController,
    public NvCrtl: NavController) { }

  ngOnInit() {
  }

  async recuperar_contra() {
    if (this.corre.length > 0) {
      const loading = await this.loadingController.create({
        message: 'Espere...',
      });
      await loading.present();
      console.log(this.corre.length);
      this._login.recover_pass({ email: this.corre }).subscribe((data) => {
        console.log(data);
        loading.onDidDismiss();
        this.successAlert('Se ha enviado un correo con las instrucciones al email ingresado.', 'Enviado');
      }, (err) => {
        // error
        console.log(err);
        loading.onDidDismiss();
        const msg = JSON.parse(err._body);
        this.errorAlert(msg.msg);
      });
      // alert(1);
    } else {
      // alert(2);
      this.presentAlert();
    }
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
            this.NvCrtl.navigateBack('/login');
            // this.navCtrl.navigateBack('/tabs/Conductores');
          }
        }
      ]
    });
    await alert.present();
  }

  async errorAlert(err: any) {
    this.loadingController.dismiss();
    const alert = await this.alertController.create({
      backdropDismiss: false,
      header: 'Error',
      subHeader: 'error al recuperar contraseña',
      message: err,
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      subHeader: 'Campo incompleto',
      message: 'Ingrese su correo',
      buttons: ['OK']
    });

    await alert.present();
  }


}
