import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeClienteService {

  datos: any;
  ip = 'https://carga-api.us-east.mybluemix.net/api/v1/';
  api_listar_categoria: string = this.ip + 'categories';

  constructor(public http: Http) { }

  listar_categoria() {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    headers.append('Accept', 'application/json');
    return this.http.get(this.api_listar_categoria, {
      headers: headers,
      method: 'GET'
    }).pipe(map(
      (res: Response) => {
        return res.json();
      }
    ));
  }
}
