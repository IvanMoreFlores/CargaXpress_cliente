import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { OrderService } from '../../services/order/order.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modal-detail',
  templateUrl: './modal-detail.page.html',
  styleUrls: ['./modal-detail.page.scss'],
})
export class ModalDetailPage implements OnInit {
  customBackActionSubscription: Subscription;
  // subcategorias: Array<Object> = [];
  subcategorias: any = [];
  sin_subcategoria: Boolean = false;
  sin_datos: Boolean = true;
  div_cero: Boolean = true;
  div_uno: Boolean = false;
  div_dos: Boolean = false;
  div_tres: Boolean = false;
  div_cuatro: Boolean = false;

  constructor(private router: Router,
    public alertController: AlertController,
    public NvCrtl: NavController,
    public _activate: ActivatedRoute,
    public _order: OrderService,
    public platform: Platform) { }

  ngOnInit() {
    this._order.listar_subcategorias(this._activate.snapshot.paramMap.get('id')).subscribe((data => {
      this.sin_datos = !this.sin_datos;
      if (data.subcategories.length > 0) {
        this.subcategorias = data.subcategories;
      } else {
        this.sin_subcategoria = !this.sin_subcategoria;
      }
    }));
  }

  click_div01() {
    this.div_cero = !this.div_cero;
    this.div_uno = !this.div_uno;
  }

  click_div02() {
    this.div_uno = !this.div_uno;
    this.div_dos = !this.div_dos;
  }

  click_div03() {
    this.div_dos = !this.div_dos;
    this.div_tres = !this.div_tres;
  }

  click_address() {
    this.div_cero = !this.div_cero;
    this.div_uno = !this.div_uno;
  }

  click_modalAdditional() {
    this.div_uno = !this.div_uno;
    this.div_dos = !this.div_dos;
  }

  click_modalDetail() {
    this.div_dos = !this.div_dos;
    this.div_tres = !this.div_tres;
  }

  click_modalFinalizar() {
    this.div_tres = !this.div_tres;
    this.div_cuatro = !this.div_cuatro;
  }

  async cerrar() {
    const alert = await this.alertController.create({
      header: 'Cerrar pedido!',
      backdropDismiss: false,
      message: 'Se <strong>Borrarán</strong> los datos del pedido',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'ok',
          handler: () => {
            this.NvCrtl.navigateRoot('/tabs');
          }
        }
      ]
    });

    await alert.present();
  }

}
