import { Component, OnInit } from '@angular/core';
declare var google;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

  map: any;
  div_footer: Boolean = false;
  arrow_dropup: Boolean = true;
  arrow_dropdown: Boolean = false;

  constructor() { }

  ngOnInit() {
    this.loadMap();
  }

  loadMap() {
    const latitude = -9.1899672;
    const longitude = -75.015152;
    const mapEle: HTMLElement = document.getElementById('map');
    const myLatLng = { lat: latitude, lng: longitude };
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      const marker = new google.maps.Marker({
        position: myLatLng,
        map: this.map,
        title: 'Hello World!'
      });
      mapEle.classList.add('show-map');
    });
  }

  mostrarDiv() {
    this.arrow_dropup = !this.arrow_dropup;
    this.arrow_dropdown = !this.arrow_dropdown;
    this.div_footer = !this.div_footer;
  }

}
