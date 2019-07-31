import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
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
  constructor(private router: Router,
    private menu: MenuController,
    public alertController: AlertController,
    public servicio: ServicioService) {
    this.listarServices();
  }

  ngOnInit() {
    this.servicio.listar_servicio().subscribe((data => {
      this.servicios = data.services;
      console.log(this.servicios);
    }), error => {
      this.respuestaFail(error.json());
    });
  }

  click_detalle(id: any) {
    // this.router.navigate(['/new-driver', 0]);
    this.router.navigate(['/servicio-detalle', id]);
    // alert(id);
    // this.router.navigateByUrl('/servicio-detalle', id);
  }

  listarServices() {
    this.servicio.listar_servicio().subscribe((data => {
      console.log(data.services.length);
      if (data.services.length > 0) {
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


}
