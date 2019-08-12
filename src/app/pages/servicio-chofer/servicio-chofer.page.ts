import { Component, OnInit } from '@angular/core';
import { MenuController, LoadingController, AlertController, } from '@ionic/angular';
import { ModalController, NavParams, IonInput } from '@ionic/angular';
import { ViewChild, ElementRef } from '@angular/core';
import { RegisterService } from './../../services/register/register.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-servicio-chofer',
  templateUrl: './servicio-chofer.page.html',
  styleUrls: ['./servicio-chofer.page.scss'],
})
export class ServicioChoferPage implements OnInit {
  choferes: any = [];
  id: any;
  items: any;
  data: any = [];
  page: number;
  //
  sin_datos: Boolean = true;
  con_datos: Boolean = false;
  cero_datos: Boolean = false;
  botones: Boolean = false;
  constructor(public modalController: ModalController,
    private navParams: NavParams,
    public _register: RegisterService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public toastController: ToastController) { }

  ngOnInit() {
    this._register.listar_driver(localStorage.getItem('id')).subscribe((data => {
      console.log('Choferes : ' + data.drivers.length);
      if (data.drivers.length > 0) {
        this.page = data.page;
        this.choferes = data.drivers;
        this.con_datos = !this.con_datos;
        this.sin_datos = !this.sin_datos;
        this.data = data.drivers;
        this.items = this.data;
      } else {
        this.cero_datos = !this.cero_datos;
        this.sin_datos = !this.sin_datos;
      }
    }), error => {
      this.respuestaFail(error.json());
    });
  }

  async myDismiss() {
    await this.modalController.dismiss({ chofer: null });
  }

  async regresar(chofer) {
    await this.modalController.dismiss({ chofer: chofer });
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

  initializeItems() {
    this.choferes = this.data;
  }

  getItems(ev: any) {
    this.initializeItems();
    const val = ev.target.value;
    if (val && val.trim() !== '') {
      this.choferes = this.choferes.filter((choferes: any) => {
        return (choferes.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }
  doRefresh(event) {
    this.sin_datos = !this.sin_datos;
    this.con_datos = !this.con_datos;
    this.cero_datos = false;
    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 2000);
  }

  siguiente(event) {
    this._register.listar_driver_pag(this.page + 1).subscribe((data => {
      if (data.drivers.length > 0) {
        this.page = data.page;
        this.choferes = this.choferes.concat(data.drivers);
        console.log(data.drivers);
        event.target.complete();
      } else {
        event.target.complete();
        this.presentToast();
      }
    }), error => {
      this.respuestaFail(error.json());
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Sin datos que mostrar',
      duration: 2000
    });
    toast.present();
  }

}
