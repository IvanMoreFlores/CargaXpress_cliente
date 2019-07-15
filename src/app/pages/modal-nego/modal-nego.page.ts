import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, NavController, MenuController } from '@ionic/angular';
import { LoadingController, ModalController } from '@ionic/angular';
import { OrderService } from '../../services/order/order.service';
import { ModalDetailPage } from '../modal-detail/modal-detail.page';

@Component({
  selector: 'app-modal-nego',
  templateUrl: './modal-nego.page.html',
  styleUrls: ['./modal-nego.page.scss'],
})
export class ModalNegoPage implements OnInit {
  detalle: any = [];
  servicios: any = [];
  costos: any = [];
  estado: Boolean = false;
  total: any = 0;
  constructor(public nvCtrl: NavController,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    public _orden: OrderService,
    public alertController: AlertController,
    public loadingCtrl: LoadingController,
    public modalController: ModalController,
    private menu: MenuController) {
    this.menu.swipeEnable(true, 'custom');
    this.menu.enable(false, 'custom');
  }

  async ngOnInit() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando datos...',
    });
    await loading.present();
    this._orden.detalle_order(this.activatedRoute.snapshot.paramMap.get('id')).subscribe((data => {
      this.detalle = data;
      this.estado = true;
      this.loadingCtrl.dismiss();
      this.total = data.price;
      this.listar_servicios();
      console.log(this.total);
    }), error => {
      this.loadingCtrl.dismiss();
      this.respuestaFail(error.json());
    });
  }

  async respuestaFail(error: any) {
    if (error.msg) {
      const alert = await this.alertController.create({
        backdropDismiss: false,
        header: 'Error',
        message: error.msg,
        buttons: ['OK']
      });
      await alert.present();
    } else {
      const alert = await this.alertController.create({
        backdropDismiss: false,
        header: 'Error',
        message: 'Falla al intentar comunicarse con el servidor',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  listar_servicios() {
    this._orden.listar_servicio().subscribe((data => {
      this.servicios = data.aditional_services;
      console.log(data);
    }));
  }

  cerrar() {
    this.router.navigate(['/detail', this.activatedRoute.snapshot.paramMap.get('id')]);
  }

  async add_services(id: any, servicio: string) {
    const modal = await this.modalController.create({
      component: ModalDetailPage,
      componentProps: { id: id, servicio: servicio }
    });
    modal.onDidDismiss().then((detail: any) => {
      console.log(detail);
      if (detail.data._id !== 0) {
        if (detail.data.tipo === 1) {
          if (detail.data.cuadra > 0) {
            console.log('Entro aqui: ');
            const costo = {
              '_id': detail.data._id,
              'price': detail.data.price,
              'servicio': servicio,
              'cuadra': detail.data.cuadra,
              'monto': detail.data.monto.toFixed(2),
            };
            this.costos.push(costo);
            console.log(this.costos);
            console.log(costo);
            console.log(this.total);
            console.log(parseFloat((this.total + parseFloat(detail.data.monto.toFixed(2))).toFixed(2)));
            this.total = parseFloat((this.total + parseFloat(detail.data.monto.toFixed(2))).toFixed(2));
          }
        } else {
          const costo = {
            '_id': detail.data._id,
            'price': detail.data.price,
            'servicio': servicio,
            'monto': detail.data.price
          };
          this.costos.push(costo);
          this.total = parseFloat((this.total + parseFloat(detail.data.price.toFixed(2))).toFixed(2));
        }
      }
    });
    return await modal.present();
  }

  eliminar_costo(busqueda) {
    const indice = this.costos.findIndex(mascota => mascota._id === busqueda);
    console.log('El elemento buscado está en el índice ', indice);
    if (indice >= -1) {
      const totalito = this.total - parseFloat(this.costos[indice].monto);
      this.total = parseFloat(totalito.toFixed(2));
      this.costos.splice(indice, 1);
    }
  }

}
