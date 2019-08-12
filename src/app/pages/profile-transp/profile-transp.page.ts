import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MenuController, LoadingController, AlertController, } from '@ionic/angular';
import { RegisterService } from './../../services/register/register.service';
import { DriverService } from '../../services/driver/driver.service';
import { NotificacionService } from '../../services/notificacion/notificacion.service';

@Component({
  selector: 'app-profile-transp',
  templateUrl: './profile-transp.page.html',
  styleUrls: ['./profile-transp.page.scss'],
})
export class ProfileTranspPage implements OnInit {

  public category: String = 'Información';
  public categories: Array<string> = ['Información', 'Conductores', 'Certificados', 'Clases'];
  choferes: any;
  sin_datos: Boolean = true;
  con_datos: Boolean = false;
  cero_datos: Boolean = false;
  perfil: any;
  contador: number;
  constructor(private menu: MenuController,
    private router: Router,
    public _driver: RegisterService,
    public _chofer: DriverService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public _noti: NotificacionService) {
    this.listar_info();
    this.menu.enable(false, 'custom');
  }

  ngOnInit() {
    this.listarDriver();
  }

  ionViewDidEnter() {
    this._noti.listar_notificaciones().subscribe((data) => {
      this.contador = data.nrCount;
    });
  }

  openFirst() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  click_notificacion() {
    this.router.navigateByUrl('/trans-noti');
  }

  modal_certificado() {
    this.router.navigateByUrl('/subir-certificado');
  }

  listarDriver() {
    this._driver.listar_driver(localStorage.getItem('id')).subscribe((data => {
      console.log(data.drivers.length);
      if (data.drivers.length > 0) {
        this.choferes = data.drivers;
        this.con_datos = !this.con_datos;
        this.sin_datos = !this.sin_datos;
      } else {
        this.cero_datos = !this.cero_datos;
        this.sin_datos = !this.sin_datos;
      }
    }), error => {
      this.respuestaFail(error.json());
    });
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

  listar_info() {
    this._chofer.get_Driver(localStorage.getItem('id')).subscribe((data => {
      this.perfil = data;
      console.log(data);
    }));
  }

}
