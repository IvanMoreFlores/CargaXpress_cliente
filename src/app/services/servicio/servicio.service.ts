import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  datos: any;
  servicio: any = {};
  ip = 'https://cargaxpress-api-dev.mybluemix.net/api/v1/';
  api_listar_servicios: string = this.ip + 'users/';
  api_servicios_id: string = this.ip + 'services/';
  api_order_id: string = this.ip + 'orders/';
  api_offer_id: string = this.ip + 'users/';
  api_ofertar: string = this.ip + 'orders/';
  api_historial: string = this.ip + 'orders/';
  constructor(public http: Http) { }

  listar_servicio() {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(this.api_listar_servicios + localStorage.getItem('id') + '/services?sort=created&sortDir=dsc', {
      headers: headers,
      method: 'GET'
    }).pipe(map(
      (res: Response) => {
        return res.json();
      }
    ));
  }

  servicios_id(data) {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(this.api_servicios_id + data, {
      headers: headers,
      method: 'GET'
    }).pipe(map(
      (res: Response) => {
        return res.json();
      }
    ));
  }

  order_id(data) {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(this.api_order_id + data, {
      headers: headers,
      method: 'GET'
    }).pipe(map(
      (res: Response) => {
        return res.json();
      }
    ));
  }

  offer_id(data) {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(this.api_offer_id + localStorage.getItem('id') + '/orders/' + data + '/offer', {
      headers: headers,
      method: 'GET'
    }).pipe(map(
      (res: Response) => {
        return res.json();
      }
    ));
  }

  historial_oferta(id_orden: any, id_ofertas: any) {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(this.api_historial + id_orden + '/offers/' + id_ofertas + '/offs?sortDir=asc', {
      headers: headers,
      method: 'GET'
    }).pipe(map(
      (res: Response) => {
        return res.json();
      }
    ));
  }

  listar_servicios_pag(page: number) {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(this.api_listar_servicios + localStorage.getItem('id') + '/services?sort=created&sortDir=dsc&page=' + page, {
      headers: headers,
      method: 'GET'
    }).pipe(map(
      (res: Response) => {
        return res.json();
      }
    ));
  }

  // http://cargaxpress-api-dev.mybluemix.net/api/v1/order/:id/offers
  nueva_oferta(data: any, id: any) {
    console.log(data);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post(this.api_ofertar + id + '/offers', data, {
      headers: headers,
      method: 'POST'
    }).pipe(map(
      (res: Response) => {
        return res.json();
      }
    ));
  }

}
