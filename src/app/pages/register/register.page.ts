import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RegisterService } from '../../services/register/register.service';
import { MenuController, AlertController, NavController, LoadingController } from '@ionic/angular';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  div_client: Boolean = false;
  div_trans: Boolean = false;

  data_client: any = {
    'profile': 1,
    'name': null,
    'lastName': null,
    'documentType': null,
    'documentCode': '',
    'userType': null,
    'ruc': '',
    'businessName': null,
    'cellphone': null,
    'phone': null,
    'email': null,
    'password': null,
    'confirmPassword': null
  };

  data_trans: any = {
    'profile': null,
    'businessName': null,
    'ruc': '',
    'cellphone': null,
    'phone': null,
    'email': null,
    'contactPerson': {
      'name': null,
      'lastName': null,
      'cellphone': null
    },
    'userType': null,
    'password': null,
    'confirmPassword': null,
    'documentType': null,
    'documentCode': '',
  };

  constructor(private router: Router,
    public _register: RegisterService,
    public alertController: AlertController,
    public NvCtrl: NavController,
    public loadingController: LoadingController,
    private menu: MenuController,
    public _storage: StorageService,
    public _activate: ActivatedRoute) {
    console.log(this._activate.snapshot.paramMap.get('id'));
    if (this._activate.snapshot.paramMap.get('id') === '1') {
      this.div_trans = !this.div_trans;
    } else {
      this.div_client = !this.div_client;
    }
    this.menu.swipeGesture(false, 'custom');
  }

  ngOnInit() {
  }

  parsear_client() {
    this.data_client.documentCode = this.data_client.documentCode.toString();
    this.data_client.ruc = this.data_client.ruc.toString();
  }

  parsear_transp() {
    this.data_trans.documentCode = this.data_trans.documentCode.toString();
    this.data_trans.ruc = this.data_trans.ruc.toString();
  }

  async btn_registrar_cliente() {
    this.presentLoading();
    await this.parsear_client();
    this.register_user(this.data_client);
  }

  async btn_registrar_transp() {
    this.presentLoading();
    await this.parsear_transp();
    this.register_user(this.data_trans);
  }

  register_user(datos: any) {
    this._register.new_user(datos).subscribe((data => {
      this.loadingController.dismiss();
      console.log(data);
      this._storage.guardar_session(data);
      this.NvCtrl.navigateRoot('/welcome');
    }), error => {
      this.respuestaFail(error.json());
    });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Espere por favor',
    });
    await loading.present();
  }

  async respuestaFail(error: any) {
    this.loadingController.dismiss();
    const alert = await this.alertController.create({
      header: 'Error',
      subHeader: 'Datos erroneos',
      message: error.msg,
      buttons: ['OK']
    });
    await alert.present();
  }

}
