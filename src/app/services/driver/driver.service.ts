import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  datos: any;
  ip = 'https://cargaxpress-api-dev.mybluemix.net/api/v1/';
  api_get_driver: string = this.ip + 'users/';
  api_update_driver: string = this.ip + 'users/';
  constructor(public http: Http) { }

  get_Driver(id: any) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Accept', 'application/json');
    return this.http.get(this.api_get_driver + id, {
      headers: headers,
      method: 'GET'
    }).pipe(map(
      (res: Response) => {
        return res.json();
      }
    ));
  }

  update_Driver(id: any, datos: any) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Accept', 'application/json');
    return this.http.put(this.api_update_driver + id, datos, {
      headers: headers,
      method: 'PUT'
    }).pipe(map(
      (res: Response) => {
        return res.json();
      }
    ));
  }

}
