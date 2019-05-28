import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, MenuController } from '@ionic/angular';
import { Platform, IonRouterOutlet, NavController, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { Router } from '@angular/router';
import { BuscadorLugarPage } from '../buscador-lugar/buscador-lugar.page';
import { HomeService } from './../../services/home/home.service';
import { OrderService } from '../../services/order/order.service';

declare var google: any;
@Component({
  selector: 'app-modal-pedido',
  templateUrl: './modal-pedido.page.html',
  styleUrls: ['./modal-pedido.page.scss'],
})
export class ModalPedidoPage implements OnInit {
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild(IonRouterOutlet) routerOutlet: IonRouterOutlet;
  customBackActionSubscription: Subscription;
  map: any;
  address: string;
  div_uno: Boolean = true;
  div_dos: Boolean = false;
  div_tres: Boolean = false;
  div_cuatro: Boolean = false;
  div_cinco: Boolean = false;
  div_seis: Boolean = false;
  div_siete: Boolean = false;
  div_ocho: Boolean = false;
  autocompleteItems: any;
  autocompleteItemsDestino: any;
  autocomplete: any;
  acService: any;
  AutocompleteService = new google.maps.places.AutocompleteService();
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  datos_orden: any = {
    'owner': localStorage.getItem('id'),
    'type': null,
    'category': null,
    'subcategory': null,
    'initPlace': null,
    'initLocation': [],
    'endPlace': null,
    'endLocation': [],
    'canDivide': null,
    'canSubcontratable': null,
    'canNegotiate': null,
    'endDate': null,
    'deliveryMaxDate': null,
    'deliveryMaxHour': null,
    'aditionalRequirements': null,
    'elements': [],
    'receptionAnswers': [],
    'destinationAnswers': []
  };
  categorias: any = [];
  subcategorias: any = [];
  questions: any = [];
  metros: number;
  precio: boolean = false;
  myDate: String = new Date().toISOString();

  constructor(private router: Router,
    public platform: Platform,
    public NvCrtl: NavController,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    public loadingController: LoadingController,
    public modalController: ModalController,
    public alertController: AlertController,
    public _home: HomeService,
    public _order: OrderService,
    private menu: MenuController) {
    this.menu.get().then((menu: HTMLIonMenuElement) => {
      menu.swipeGesture = false;
    });
  }

  ngOnInit() {
  }

  tipo_pedido(opcion: number) {
    this.loadMap();
    this.datos_orden.type = opcion;
    console.log(opcion);
    this.div_uno = !this.div_uno;
    this.div_dos = !this.div_dos;
  }

  async loadMap() {
    const loading = await this.loadingController.create({
      message: 'Espere...',
      duration: 2000
    });
    await loading.present();
    this.geolocation.getCurrentPosition().then((resp) => {
      const latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      const mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeControl: false,
        zoomControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.map.addListener('tilesloaded', () => {
        loading.onDidDismiss();
      });
      this.directionsDisplay.setMap(this.map);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  async click_buscador(id: any) {
    const modal: HTMLIonModalElement =
      await this.modalController.create({
        component: BuscadorLugarPage,
        componentProps: {
          id: id
        }
      });

    modal.onDidDismiss().then((detail: any) => {
      if (detail.data.id === 0) {
      } else if (detail.data.id === 1) {
        this.decodificar_dire(detail.data.description, detail.data.id);
        this.datos_orden.initPlace = detail.data.description;

      } else if (detail.data.id === 2) {
        this.decodificar_dire(detail.data.description, detail.data.id);
        this.datos_orden.endPlace = detail.data.description;
      }
    });
    await modal.present();
  }

  async trazar_ruta() {
    console.log(this.datos_orden.initLocation.length);
    if (this.datos_orden.initLocation.length > 0 && this.datos_orden.endLocation.length > 0) {
      const loading = await this.loadingController.create({
        message: 'Espere...',
      });
      await loading.present();
      const star = new google.maps.LatLng(this.datos_orden.initLocation[0], this.datos_orden.initLocation[1]);
      const end = new google.maps.LatLng(this.datos_orden.endLocation[0], this.datos_orden.endLocation[1]);
      this.directionsService.route({
        origin: star,
        destination: end,
        travelMode: 'DRIVING'
      }, (response, status) => {
        if (status === 'OK') {
          const metros = response.routes[0]['legs'][0];
          this.metros = metros.distance.value;
          console.log(metros.distance.value);
          this.directionsDisplay.setDirections(response);
          loading.dismiss();
        } else {
          alert('Petición de indicaciones fallidas debido a ' + status);
        }
      });
    } else {
      console.log('error');
    }
  }

  traer_precio() {
    if (this.datos_orden.type === 3) {
      this._order.traer_precio(this.datos_orden.subcategory, this.metros).subscribe((data) => {
        this.precio = true;
        this.datos_orden.price = data.amount;
        console.log(data);
      });
    }
  }

  async respuestaFail(error: any) {
    this.loadingController.dismiss();
    const alert = await this.alertController.create({
      header: 'Error',
      subHeader: 'Datos erroneos',
      message: error.msg,
      buttons: ['OK']
    });
    await alert.present();
  }

  boton_atras(number) {
    if (number === 1) {
      this.div_dos = !this.div_dos;
      this.div_uno = !this.div_uno;
    } if (number === 2) {
      this.div_cinco = !this.div_cinco;
      this.div_cuatro = !this.div_cuatro;
    } if (number === 3) {
      this.div_seis = !this.div_seis;
      this.div_cinco = !this.div_cinco;
    } if (number === 4) {
      this.div_siete = !this.div_siete;
      this.div_seis = !this.div_seis;
    }

  }

  decodificar_dire(description: any, id: any) {
    setTimeout(() => {
      this.nativeGeocoder.forwardGeocode(description)
        .then((result: NativeGeocoderResult[]) => {
          if (id === 1) {
            this.datos_orden.initLocation = [result[0].latitude, result[0].longitude];
            this.trazar_ruta();
          } else {
            this.datos_orden.endLocation = [result[0].latitude, result[0].longitude];
            this.trazar_ruta();
          }
        })
        .catch((error: any) => console.log(error));
    }, 500);
  }

  click_tres() {
    if (this.datos_orden.initPlace && this.datos_orden.endPlace) {
      this._home.listar_categoria().subscribe((data) => {
        this.div_dos = !this.div_dos;
        this.div_tres = !this.div_tres;
        this.categorias = data.categories;
      });
    } else {
      this.completarAlert();
    }
  }

  click_cuatro(id: any) {
    this.datos_orden.category = id;
    this._order.listar_subcategorias(id).subscribe((data => {
      this.div_tres = !this.div_tres;
      this.div_cuatro = !this.div_cuatro;
      this.subcategorias = data.subcategories;
    }));
  }

  click_cinco(id: any) {
    const answers = [];
    this.datos_orden.elements = answers;
    this.datos_orden.elements.answers = [];
    this.datos_orden.subcategory = id;
    this._order.listar_questions(id).subscribe((data => {
      this.div_cuatro = !this.div_cuatro;
      this.div_cinco = !this.div_cinco;
      this.questions = data.questions;
      this.questions.forEach(element => {
        delete element.subcategory;
        delete element.__v;
        delete element._id;
        if (element.questionCategory === 0) {
          console.log(element);
          this.datos_orden.receptionAnswers.push(element);
        } else if (element.questionCategory === 1) {
          this.datos_orden.elements.answers.push(element);
        } else if (element.questionCategory === 2) {
          this.datos_orden.destinationAnswers.push(element);
        }
      });
    }));
  }

  click_seis() {
    this.div_cinco = !this.div_cinco;
    this.div_seis = !this.div_seis;
  }

  click_siete() {
    this.div_seis = !this.div_seis;
    this.div_siete = !this.div_siete;
    this.traer_precio();
    // console.log(this.datos_orden);
  }

  async crear_pedido() {
    const loading = await this.loadingController.create({
      message: 'Espere...',
    });
    await loading.present();
    this._order.nueva_order(this.datos_orden).subscribe((data) => {
      // success
      loading.onDidDismiss();
      // const msg =  JSON.parse(data.response);
      console.log(data);
      this.successAlert('Orden registrada', 'Registrada');
    }, (err) => {
      // error
      console.log(err);
      loading.onDidDismiss();
      const msg = JSON.parse(err._body);
      this.errorAlert(msg.msg);
    });
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
            this.NvCrtl.navigateBack('/tabs');
            // this.navCtrl.navigateBack('/tabs/Conductores');
          }
        }
      ]
    });
    await alert.present();
  }

  async errorAlert(err: any) {
    this.loadingController.dismiss();
    const alert = await this.alertController.create({
      backdropDismiss: false,
      header: 'Error',
      subHeader: 'error al registrar orden',
      message: err,
      buttons: ['OK']
    });
    await alert.present();
  }

  async completarAlert() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      backdropDismiss: false,
      subHeader: 'Campos incompletos',
      message: 'Relleno todos los campos.',
      buttons: ['OK']
    });
    await alert.present();
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

  ionViewDidEnter() {
    this.platform.backButton.subscribeWithPriority(0, () => {
      if (this.routerOutlet && this.routerOutlet.canGoBack()) {
        this.routerOutlet.pop();
      } else if (this.router.url === '/modal-pedido') {
        this.cerrar();
        // or if that doesn't work, try
        // navigator['app'].exitApp();
      } else {
        // this.generic.showAlert("Exit", "Do you want to exit the app?", this.onYesHandler, this.onNoHandler, "backPress");
      }
    });
  }
}


