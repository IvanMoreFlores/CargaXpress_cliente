import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NotificacionService } from '../../services/notificacion/notificacion.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  tab_client: Boolean = false;
  tab_transp: Boolean = false;
  contador: number;

  constructor(private NvCrl: NavController,
    public _noti: NotificacionService) { }

  ngOnInit() {
    if (localStorage.getItem('profile') === 'Cliente' || localStorage.getItem('profile') === '1') {
      this.tab_client = !this.tab_client;
      this.NvCrl.navigateRoot('/tabs/Pedidos');
    } else {
      this.NvCrl.navigateRoot('/tabs/InicioChofer');
      this.tab_transp = !this.tab_transp;
    }
  }
  ionViewDidEnter() {
    this._noti.listar_notificaciones().subscribe((data) => {
      this.contador = data.nrCount;
    });
  }
}
