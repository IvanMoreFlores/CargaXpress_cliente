import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, Platform, IonRouterOutlet } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { HomeService } from './../../services/home/home.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  // categorias: Array<Object> = [];
  categorias: any = [];
  sin_datos: Boolean = true;
  con_datos: Boolean = false;
  cero_datos: Boolean = false;
  salir: Boolean = false;

  @ViewChild(IonRouterOutlet) routerOutlet: IonRouterOutlet;
  constructor(private router: Router,
    public modalController: ModalController,
    private menu: MenuController,
    public _home: HomeService,
    public platform: Platform) {
    this.menu.enable(false, 'custom');
  }



  ngOnInit() {
    this._home.listar_categoria().subscribe((data) => {
      if (data.categories.length > 0) {
        this.categorias = data.categories;
        this.con_datos = !this.con_datos;
        this.sin_datos = !this.sin_datos;
        console.log(this.categorias);
      } else {
        this.cero_datos = !this.cero_datos;
      }
    });
  }

  openFirst() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  modalSubcat(id: any) {
    this.router.navigate(['/modal-detail', id]);
  }

  doRefresh(event: any) {
    this.sin_datos = !this.sin_datos;
    this.con_datos = !this.con_datos;
    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 2000);
  }


}
