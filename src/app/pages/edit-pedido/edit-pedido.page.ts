import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ModalController, AlertController } from '@ionic/angular';
import { Platform, NavController, LoadingController } from '@ionic/angular';
import { ViewChild, ElementRef } from '@angular/core';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { OrderService } from '../../services/order/order.service';
import { BuscadorLugarPage } from '../buscador-lugar/buscador-lugar.page';

declare var google: any;
@Component({
  selector: 'app-edit-pedido',
  templateUrl: './edit-pedido.page.html',
  styleUrls: ['./edit-pedido.page.scss'],
})
export class EditPedidoPage implements OnInit {

  @ViewChild('map', { static: false }) mapElement: ElementRef;
  datos_orden: any = [];
  map: any;
  autocompleteItems: any;
  autocompleteItemsDestino: any;
  autocomplete: any;
  acService: any;
  AutocompleteService = new google.maps.places.AutocompleteService();
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  metros: number;
  precio: Boolean = false;
  constructor(private router: Router,
    public platform: Platform,
    private activatedRoute: ActivatedRoute,
    public modalController: ModalController,
    public alertController: AlertController,
    public loadingCtrl: LoadingController,
    public _orden: OrderService,
    private nativeGeocoder: NativeGeocoder) { }

  async ngOnInit() {
    console.log(this.activatedRoute.snapshot.paramMap.get('id'));
    const loading = await this.loadingCtrl.create({
      message: 'Procesando informacion...',
    });
    await loading.present();
    this._orden.detalle_order(this.activatedRoute.snapshot.paramMap.get('id')).subscribe((data => {
      this.datos_orden = data;
      this.loadingCtrl.dismiss();
      this.loadMap(data.endLocation.coordinates).then(() => {
        this.trazar_ruta();
      });
      console.log(data);
    }));
  }

  async loadMap(coords) {
    const latLng = new google.maps.LatLng(coords[0], coords[1]);
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
    });
    this.directionsDisplay.setMap(this.map);
  }

  cerrar() {
    // this.NvCrtl.navigateBack('/detail');
    this.router.navigate(['/detail', this.activatedRoute.snapshot.paramMap.get('id')]);
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

  async trazar_ruta() {
    console.log(this.datos_orden.initLocation.length);
    if (this.datos_orden.initLocation.length > 0 && this.datos_orden.endLocation.length > 0) {
      const loading = await this.loadingCtrl.create({
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


}
