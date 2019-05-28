import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  datos: any;
  ip = 'https://carga-api.us-east.mybluemix.net/api/v1/';
  api_listar_user: string = this.ip + 'users/' + localStorage.getItem('id');
  constructor(public http: Http) { }


  listar_user() {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    headers.append('Accept', 'application/json');
    return this.http.get(this.api_listar_user, {
      headers: headers,
      method: 'GET'
    }).pipe(map(
      (res: Response) => {
        return res.json();
      }
    ));
  }

}
