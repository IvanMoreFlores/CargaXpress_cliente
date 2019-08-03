import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  datos: any;
  orden: any = {};
  ip = 'https://cargaxpress-api-dev.mybluemix.net/api/v1/';
  api_listar_subcategorias: string = this.ip + 'categories/';
  api_listar_orden: string = this.ip + 'orders?sort=created&sortDir=dsc&isSearch=1';
  api_listar_orden_id: string = this.ip + 'users/';
  api_listar_questions: string = this.ip + 'subcategories/';
  api_traer_precio: string = this.ip + 'subcategories/';
  api_nueva_order: string = this.ip + 'orders/';
  api_detalle_order: string = this.ip + 'orders/';
  api_listar_ofertas: string = this.ip + 'orders/';
  api_nueva_contra: string = this.ip + 'orders/';
  api_aceptar_contra: string = this.ip + 'orders/';
  api_traer_empresas: string = this.ip + 'aditionalservices/';
  api_traer_servicio: string = this.ip + 'aditionalservices/';

  constructor(public http: Http) { }

  listar_servicio() {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(this.api_traer_servicio, {
      headers: headers,
      method: 'GET'
    }).pipe(map(
      (res: Response) => {
        return res.json();
      }
    ));
  }

  traer_empresas(id: any) {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(this.api_traer_empresas + id + '/services', {
      headers: headers,
      method: 'GET'
    }).pipe(map(
      (res: Response) => {
        return res.json();
      }
    ));
  }

  aceptar_contra(id: any, oid: any) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post(this.api_aceptar_contra + id + '/offers/' + oid + '/accept', {}, {
      headers: headers,
      method: 'POST'
    }).pipe(map(
      (res: Response) => {
        return res.json();
      }
    ));
  }

  nueva_contra(data: any, id: any) {
    console.log(data);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post(this.api_nueva_contra + id + '/offers', data, {
      headers: headers,
      method: 'POST'
    }).pipe(map(
      (res: Response) => {
        return res.json();
      }
    ));
  }

  listar_ofertas(id: any) {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(this.api_listar_ofertas + id + '/offers', {
      headers: headers,
      method: 'GET'
    }).pipe(map(
      (res: Response) => {
        return res.json();
      }
    ));
  }

  detalle_order(id: any) {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(this.api_detalle_order + id, {
      headers: headers,
      method: 'GET'
    }).pipe(map(
      (res: Response) => {
        return res.json();
      }
    ));
  }

  nueva_order(data) {
    this.orden = data;
    console.log(this.orden);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post(this.api_nueva_order, this.orden, {
      headers: headers,
      method: 'POST'
    }).pipe(map(
      (res: Response) => {
        return res.json();
      }
    ));
  }

  traer_precio(id: any, metros: any) {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(this.api_traer_precio + id + '/calculatedprice?mts=' + metros, {
      headers: headers,
      method: 'GET'
    }).pipe(map(
      (res: Response) => {
        return res.json();
      }
    ));
  }

  listar_questions(id) {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(this.api_listar_questions + id + '/questions', {
      headers: headers,
      method: 'GET'
    }).pipe(map(
      (res: Response) => {
        return res.json();
      }
    ));
  }

  listar_subcategorias(id) {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(this.api_listar_subcategorias + id + '/subcategories?hasquestions=1', {
      headers: headers,
      method: 'GET'
    }).pipe(map(
      (res: Response) => {
        return res.json();
      }
    ));
  }

  listar_orden() {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(this.api_listar_orden, {
      headers: headers,
      method: 'GET'
    }).pipe(map(
      (res: Response) => {
        return res.json();
      }
    ));
  }

  listar_orden_id() {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(this.api_listar_orden_id + localStorage.getItem('id') + '/orders?sort=created&sortDir=dsc', {
      headers: headers,
      method: 'GET'
    }).pipe(map(
      (res: Response) => {
        return res.json();
      }
    ));
  }

  listar_orden_id_pag(page: number) {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(this.api_listar_orden + '&page=' + page, {
      headers: headers,
      method: 'GET'
    }).pipe(map(
      (res: Response) => {
        return res.json();
      }
    ));
  }


}
