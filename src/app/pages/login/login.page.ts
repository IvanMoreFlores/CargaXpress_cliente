import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, AlertController, NavController, LoadingController, Platform } from '@ionic/angular';
import { LoginService } from '../../services/login/login.service';
import { StorageService } from '../../services/storage/storage.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormArray, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage {
  // private formularioUsuario: FormGroup;
  formularioUsuario: FormGroup;
  customBackActionSubscription: Subscription;
  type: String = 'password';
  icono: String = 'eye';
  data: any = {
    email: null,
    password: null
  };

  constructor(private router: Router,
    private menu: MenuController,
    public _login: LoginService,
    public _storage: StorageService,
    public alertController: AlertController,
    public NvCtrl: NavController,
    public loadingController: LoadingController,
    public platform: Platform,
    public fb: FormBuilder,
    private events: Events) {
      this.menu.swipeGesture(false, 'custom');
    this.formularioUsuario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
    this.menu.get().then((menu: HTMLIonMenuElement) => {
      menu.swipeGesture = false;
    });
    this.menu.enable(false, 'custom');
  }

  sign() {
    this.router.navigateByUrl('/sign');
  }

  recover() {
    this.router.navigateByUrl('/recover');
  }

  async login() {
    const loading = await this.loadingController.create({
      message: 'Espere por favor',
    });
    await loading.present();
    this._login.login(this.data).subscribe((async data => {
      loading.dismiss();
      this._storage.guardar_session(data);
      this.home(data);
    }), error => {
      loading.dismiss();
      this.respuestaFail(error.json());
    });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Espere por favor',
    });
    await loading.present();
  }

  home(data: any) {
    if (data.user.profile.name === 'Cliente') {
      console.log(data.user.name);
      console.log(data.user.lastName);
      const user = data.user.name + ' ' + data.user.lastName;
      this.events.publish('user', user);
      this._storage.sendMessage(data.user.name + ' ' + data.user.lastName);
      this.loadingController.dismiss();
      this.NvCtrl.navigateRoot('/tabs/Pedidos');
    } else {
      console.log(data.user.businessName);
      const user = data.user.businessName;
      this.events.publish('user', user);
      this._storage.sendMessage(data.user.businessName);
      this.loadingController.dismiss();
      this.NvCtrl.navigateRoot('/tabs/InicioChofer');
    }
  }



  async respuestaFail(error: any) {
    this.loadingController.dismiss();
    if (error.msg) {
      this.loadingController.dismiss();
      const alert = await this.alertController.create({
        header: 'Error',
        subHeader: 'Datos erroneos',
        message: error.msg,
        buttons: ['OK']
      });
      await alert.present();
    } else {
      this.loadingController.dismiss();
      const alert = await this.alertController.create({
        header: 'Error',
        subHeader: 'Datos erroneos',
        message: error,
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  type_password() {
    if (this.type === 'text') {
      this.icono = 'eye';
      this.type = 'password';
    } else {
      this.icono = 'eye-off';
      this.type = 'text';
    }
  }

  ionViewDidEnter() {
    this.customBackActionSubscription = this.platform.backButton.subscribe(() => {
      navigator['app'].exitApp();
    });
  }

  ionViewWillLeave() {
    if (this.customBackActionSubscription) {
      this.customBackActionSubscription.unsubscribe();
    }
  }

}
