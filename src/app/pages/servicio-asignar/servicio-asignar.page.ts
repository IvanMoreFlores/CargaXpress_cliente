import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../../services/servicio/servicio.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ServicioChoferPage } from '../servicio-chofer/servicio-chofer.page';
import * as moment from 'moment';

@Component({
  selector: 'app-servicio-asignar',
  templateUrl: './servicio-asignar.page.html',
  styleUrls: ['./servicio-asignar.page.scss'],
})
export class ServicioAsignarPage implements OnInit {

  elements: any = [];
  chofer: any;
  nombre_chofer: String;
  checked = [];
  Asignar = {};
  link: String;
  constructor(private router: Router,
    public service: ServicioService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public modalController: ModalController) {
    console.log(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  async ngOnInit() {// console.log(this.Asignar);
    const loading = await this.loadingController.create({
      message: 'Trayendo elementos...'
    });
    await loading.present();
    this.service.listar_elements(this.activatedRoute.snapshot.paramMap.get('id')).subscribe((data) => {
      loading.dismiss();
      this.elements = data.elements;
      console.log(this.elements.length);
    });
  }

  addCheckbox(event, checkbox: any) {
    console.log(event);
    if (event.detail.checked) {
      console.log('Si entre');
      this.checked.push(checkbox);
    } else {
      console.log('No entre');
      let index = this.removeCheckedFromArray(checkbox);
      this.checked.splice(index, 1);
    }
  }

  // Removes checkbox from array when you uncheck it
  removeCheckedFromArray(checkbox: String) {
    return this.checked.findIndex((category) => {
      return category === checkbox;
    });
  }

  async getCheckedBoxes() {
    // // Do whatever
    // // console.log(this.checked);
    this.Asignar = {
      driver: this.chofer._id,
      elements: this.checked,
      link: this.link
    };
    // console.log(this.Asignar);
    const loading = await this.loadingController.create({
      message: 'Asignando servicio...'
    });
    await loading.present();
    this.service.asignar(this.Asignar, this.activatedRoute.snapshot.paramMap.get('id')).subscribe((data => {
      console.log(data);
      this.successAlert('Se asigno correctamente', 'Registrado');
      loading.dismiss();
    }), error => {
      loading.dismiss();
      this.respuestaFail(error.json());
    });
  }

  async click_chofer() {
    this.modalController.dismiss();
    const modal: HTMLIonModalElement =
      await this.modalController.create({
        component: ServicioChoferPage
      });

    modal.onDidDismiss().then((detail: any) => {
      if (detail.data.chofer) {
        this.chofer = detail.data.chofer;
        this.nombre_chofer = detail.data.chofer.name + ', ' + detail.data.chofer.lastName;
        console.log(this.chofer);
      }
    });
    await modal.present();
  }

  click_pedido() {
    this.navCtrl.pop();
  }

  async successAlert(body: any, inf: any) {
    console.log('Mensaje : ' + body);
    this.loadingController.dismiss();
    const alert = await this.alertController.create({
      header: inf,
      backdropDismiss: false,
      subHeader: body,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    await alert.present();
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