import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../../services/servicio/servicio.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-pedido-asignar',
  templateUrl: './pedido-asignar.page.html',
  styleUrls: ['./pedido-asignar.page.scss'],
})
export class PedidoAsignarPage implements OnInit {

  constructor(private router: Router,
    public service: ServicioService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public modalController: ModalController) {
    console.log(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
  }

  click_pedido() {
    this.navCtrl.pop();
  }

}
