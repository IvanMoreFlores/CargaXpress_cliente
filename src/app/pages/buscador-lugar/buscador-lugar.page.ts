import { Component, OnInit } from '@angular/core';
import { Platform, NavController, LoadingController, ModalController, NavParams, IonInput } from '@ionic/angular';
import { ViewChild, ElementRef } from '@angular/core';
declare var google: any;

@Component({
  selector: 'app-buscador-lugar',
  templateUrl: './buscador-lugar.page.html',
  styleUrls: ['./buscador-lugar.page.scss'],
})
export class BuscadorLugarPage implements OnInit {

  @ViewChild('input') inputElement: IonInput;

  address: string;
  autocompleteItems: any;
  autocompleteItemsDestino: any;
  autocomplete: any;
  acService: any;
  AutocompleteService = new google.maps.places.AutocompleteService();
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  constructor(public modalController: ModalController,
    private navParams: NavParams) { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.inputElement.setFocus();
    }, 400);
  }

  ngOnInit() {
    this.acService = this.AutocompleteService;
    this.autocompleteItems = [];
    this.autocompleteItemsDestino = [];
    this.autocomplete = {
      query: ''
    };
  }

  updateSearch() {
    if (this.autocomplete.query === '') {
      this.autocompleteItems = [];
      return;
    }
    const self = this;
    const config = {
      types: [], // other types available in the API: 'establishment', 'regions', and 'cities'
      input: this.autocomplete.query,
      componentRestrictions: { country: 'PE' }
    };
    this.acService.getPlacePredictions(config, function (predictions, status) {
      self.autocompleteItems = [];
      if (predictions) {
        predictions.forEach(function (prediction) {
          self.autocompleteItems.push(prediction);
        });
      }
      else {
        console.log('no predictions');
      }
    });
  }

  async myDismiss() {
    await this.modalController.dismiss({ description: null, id: 0 });
  }

  async regresar(description, item) {
    console.log(item);
    await this.modalController.dismiss({ description: description, id: this.navParams.get('id') });
  }

}
