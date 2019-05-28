import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { StorageService } from '../../services/storage/storage.service';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  btn_cliente: Boolean = false;
  btn_transp: Boolean = false;
  nombre: String = '';
  constructor(private router: Router,
    private menu: MenuController,
    public NvCtrl: NavController,
    public _storage: StorageService) {
    this.menu.enable(false, 'custom');
    if (localStorage.getItem('name') === undefined || localStorage.getItem('name') === 'undefined') {
      this.nombre = localStorage.getItem('businessName');
    } else {
      this.nombre = localStorage.getItem('name');
    }
  }

  ngOnInit() {
    if (localStorage.getItem('profile') === '1' || localStorage.getItem('profile') === 'Cliente') {
      this.btn_cliente = !this.btn_cliente;
    } else {
      this.btn_transp = !this.btn_transp;
    }
  }

  home_client() {
    this._storage.sendMessage(localStorage.getItem('name') + ' ' + localStorage.getItem('lastName'));
    this.NvCtrl.navigateRoot('/tabs/Inicio');
  }

  home_transp() {
    this._storage.sendMessage(localStorage.getItem('businessName'));
    this.NvCtrl.navigateRoot('/tabs/InicioChofer');
  }

}
