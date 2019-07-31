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

}
