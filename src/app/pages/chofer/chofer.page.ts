import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, LoadingController, AlertController, } from '@ionic/angular';
import { RegisterService } from './../../services/register/register.service';
import { ToastController } from '@ionic/angular';
import { NotificacionService } from '../../services/notificacion/notificacion.service';

@Component({
  selector: 'app-chofer',
  templateUrl: './chofer.page.html',
  styleUrls: ['./chofer.page.scss'],
})
export class ChoferPage implements OnInit {

  sin_datos: Boolean = true;
  con_datos: Boolean = false;
  cero_datos: Boolean = false;
  botones: Boolean = false;
  // choferes: Array<Object> = [];
  choferes: any = [];
  id: any;
  items: any;
  data: any = [];
  page: number;
  contador: number;

  constructor(private router: Router,
    private menu: MenuController,
    public _register: RegisterService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public toastController: ToastController,
    public _noti: NotificacionService) { }

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

  ionViewDidEnter() {
    this._noti.listar_notificaciones().subscribe((data) => {
      this.contador = data.nrCount;
    });
  }

  click_notificacion() {
    this.router.navigateByUrl('/trans-noti');
  }

  openFirst() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  div_opciones(id: any) {
    this.id = id;
    this.botones = !this.botones;
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

  new_driver() {
    this.router.navigate(['/new-driver', 0]);
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

  editarDriver(id: any) {
    this.router.navigate(['/new-driver', id]);
  }

  async eliminarDriver(id: any, nombre: any, apellido: any) {
    this.botones = !this.botones;
    const alert = await this.alertController.create({
      header: 'Eliminar conductor',
      backdropDismiss: false,
      message: 'Se eliminara a <b>' + nombre + ' ' + apellido + '<b>',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Eliminar',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
  }

}
