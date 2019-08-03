import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { ServicioService } from '../../services/servicio/servicio.service';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.page.html',
  styleUrls: ['./servicios.page.scss'],
})
export class ServiciosPage implements OnInit {

  sin_datos: Boolean = true;
  con_datos: Boolean = false;
  cero_datos: Boolean = false;
  servicios: any;
  page: number;
  constructor(private router: Router,
    private menu: MenuController,
    public alertController: AlertController,
    public servicio: ServicioService,
    public toastController: ToastController) {
    this.listarServices();
  }

  ngOnInit() {
    this.servicio.listar_servicio().subscribe((data => {
      this.servicios = data.services;
      this.page = data.page;
      console.log(this.servicios);
    }), error => {
      this.respuestaFail(error.json());
    });
  }

  click_detalle(id: any) {
    this.router.navigate(['/servicio-detalle', id]);
  }

  listarServices() {
    this.servicio.listar_servicio().subscribe((data => {
      console.log(data.services.length);
      if (data.services.length > 0) {
        this.page = data.page;
        this.servicios = data.services;
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

  doRefresh(event: any) {
    this.sin_datos = !this.sin_datos;
    this.con_datos = !this.con_datos;
    setTimeout(() => {
      this.listarServices();
      event.target.complete();
    }, 2000);
  }

  openFirst() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
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

  async presentAlertRadio() {
    const alert = await this.alertController.create({
      header: 'Filtrar',
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          label: 'Asignado',
          value: 'value1',
          checked: true
        },
        {
          name: 'radio2',
          type: 'radio',
          label: 'No asignado',
          value: 'value2'
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
          text: 'filtrar',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }

  siguiente(event) {
    this.servicio.listar_servicios_pag(this.page + 1).subscribe((data => {
      if (data.services.length > 0) {
        this.page = data.page;
        this.servicios = this.servicios.concat(data.services);
        console.log(data.orders);
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
