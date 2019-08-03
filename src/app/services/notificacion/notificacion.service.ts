import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  datos: any;
  ip = 'https://cargaxpress-api-dev.mybluemix.net/api/v1/';
  api_listar_notificaciones: string = this.ip + 'users/';
  api_listar_historial: string = this.ip + 'orders/';
  constructor(public http: Http) { }

  listar_historial(id_orden: any, id_ofer: any) {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(this.api_listar_historial + id_orden + '/offers/' + id_ofer + '/offs', {
      headers: headers,
      method: 'GET'
    }).pipe(map(
      (res: Response) => {
        return res.json();
      }
    ));
  }

  listar_notificaciones() {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(this.api_listar_notificaciones + localStorage.getItem('id') + '/notifications', {
      headers: headers,
      method: 'GET'
    }).pipe(map(
      (res: Response) => {
        return res.json();
      }
    ));

    // const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    // headers.append('Accept', 'application/json');
    // return this.http.get(this.listar_notificaciones + id + '/notifications', {
    //   headers: headers,
    //   method: 'GET'
    // }).pipe(map(
    //   (res: Response) => {
    //     return res.json();
    //   }
    // ));
  }
}
