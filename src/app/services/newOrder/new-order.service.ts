import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NewOrderService {

  datos: any;
  ip = 'https://cargaxpress-api-dev.mybluemix.net/api/v1/';
  api_listar_subcategorias: string = this.ip + 'categories/';

  constructor(public http: Http) { }

  listar_subcategorias(id) {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    headers.append('Accept', 'application/json');
    return this.http.get(this.api_listar_subcategorias + id + '/subcategories', {
      headers: headers,
      method: 'GET'
    }).pipe(map(
      (res: Response) => {
        return res.json();
      }
    ));
  }
}
