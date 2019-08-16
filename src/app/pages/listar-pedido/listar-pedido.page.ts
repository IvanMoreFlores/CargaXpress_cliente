import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import { Platform, IonRouterOutlet } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-listar-pedido',
  templateUrl: './listar-pedido.page.html',
  styleUrls: ['./listar-pedido.page.scss'],
})
export class ListarPedidoPage implements OnInit {
  @ViewChild(IonRouterOutlet, { static: false }) routerOutlet: IonRouterOutlet;

  customBackActionSubscription: Subscription;
  constructor(private router: Router,
    private menu: MenuController,
    public platform: Platform,
    public NvCtrl: NavController) { }


  ngOnInit() {
    this.menu.swipeGesture(false, 'custom');
  }

  detail() {
    this.router.navigateByUrl('/detail');
  }

  home() {
    this.router.navigateByUrl('/home');
  }

  openFirst() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  ionViewDidEnter() {
    // this.platform.backButton.subscribeWithPriority(0, () => {
    //   if (this.routerOutlet && this.routerOutlet.canGoBack()) {
    //     this.routerOutlet.pop();
    //   } else if (this.router.url === '/Pedidos') {
    //     // or if that doesn't work, try
    //     navigator['app'].exitApp();
    //   } else {
    //     // this.generic.showAlert("Exit", "Do you want to exit the app?", this.onYesHandler, this.onNoHandler, "backPress");
    //   }
    // });
  }

}
