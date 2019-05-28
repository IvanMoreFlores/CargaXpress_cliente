import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { MenuController, AlertController } from '@ionic/angular';
import { HomeService } from '../../services/home/home.service';
import { OrderService } from './../../services/order/order.service';

// Modal

@Component({
  selector: 'app-home-chofer',
  templateUrl: './home-chofer.page.html',
  styleUrls: ['./home-chofer.page.scss'],
})
export class HomeChoferPage implements OnInit {

  // categorias: Array<Object> = [];
  // subcategorias: Array<Object> = [];
  // ordenes: Array<Object> = [];
  categorias: any;
  subcategorias: any;
  ordenes: any;
  div_select: Boolean = false;
  sin_datos: Boolean = true;
  con_datos: Boolean = false;
  cero_datos: Boolean = false;

  constructor(private router: Router,
    public modalController: ModalController,
    private menu: MenuController,
    private _home: HomeService,
    private _orden: OrderService,
    public alertController: AlertController) {
    this.listarOrder();
  }

  ngOnInit() {
    this._home.listar_categoria().subscribe((data => {
      this.categorias = data.categories;
      console.log(this.categorias);
    }), error => {
      this.respuestaFail(error.json());
    });
  }

  public changeEnvironment(event): void {
    this.div_select = false;
    console.log(JSON.stringify(event.detail.value));
    this.traer_subc(event.detail.value);
  }

  traer_subc(_id) {
    this._home.listar_subcategorias(_id).subscribe((data) => {
      this.subcategorias = data.subcategories;
      this.div_select = !this.div_select;
      console.log(data);
    });
  }

  presentModal() {

  }

  openFirst() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  list_order() {
    this.router.navigateByUrl('/listar-pedido');
  }

  modalSubcat(id: any) {
    this.router.navigateByUrl('/detail');
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

  listarOrder() {
    this._orden.listar_orden().subscribe((data => {
      console.log(data.orders.length);
      if (data.orders.length > 0) {
        this.ordenes = data.orders;
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
      this.listarOrder();
      event.target.complete();
    }, 2000);
  }

}
