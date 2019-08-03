import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../../services/servicio/servicio.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-servicio-detalle',
  templateUrl: './servicio-detalle.page.html',
  styleUrls: ['./servicio-detalle.page.scss'],
})
export class ServicioDetallePage implements OnInit {
  servicio: any = {};
  constructor(private router: Router,
    public service: ServicioService,
    private activatedRoute: ActivatedRoute,
    public loadingController: LoadingController,
    public alertController: AlertController) {
    console.log(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  async ngOnInit() {
    const loading = await this.loadingController.create({
      message: 'Espere por favor...'
    });
    await loading.present();
    this.service.servicios_id(this.activatedRoute.snapshot.paramMap.get('id')).subscribe((data => {
      console.log(data);
      this.servicio = data;
      loading.dismiss();
    }), error => {
      loading.dismiss();
      this.respuestaFail(error.json());
    });
  }

  click_pedido(id: any) {
    this.router.navigate(['/pedido-detalle', id, 1]);
    // this.router.navigate(['/pedido-detalle', id]);
  }

  devolver_fecha(fecha: any) {
    return (moment(fecha).format('DD-MM-YYYY'));
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

}
