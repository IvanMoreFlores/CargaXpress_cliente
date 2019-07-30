import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  datos: any;
  ip = 'https://cargaxpress-api-dev.mybluemix.net/api/v1/';
  api_new_client: string = this.ip + 'users';
  api_get_driver: string = this.ip + 'users/';
  api_new_driver: string = this.ip + 'users';
  constructor(public http: Http) { }

  new_user(data: any) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Accept', 'application/json');
    return this.http.post(this.api_new_client, data, {
      headers: headers,
      method: 'POST'
    }).pipe(map(
      (res: Response) => {
        return res.json();
      }
    ));
  }

  listar_driver(id: any) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Accept', 'application/json');
    return this.http.get(this.api_get_driver + id + '/drivers', {
      headers: headers,
      method: 'GET'
    }).pipe(map(
      (res: Response) => {
        return res.json();
      }
    ));
  }

  ImgUp(data: any) {
    const headers = new Headers();
    headers.append('content-type', 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW');
    headers.append('Accept', 'application/json');
    // const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(this.api_new_driver, data, {
      headers: headers,
      method: 'POST'
    }).pipe(map(
      (res: Response) => {
        return res.json();
      }
    ));
  }

}
