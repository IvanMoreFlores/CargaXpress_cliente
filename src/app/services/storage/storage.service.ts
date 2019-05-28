import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private subject = new Subject<any>();

  constructor(private storage: Storage,
    private platform: Platform) {
  }

  sendMessage(message: string) {
    this.subject.next({ text: message });
  }

  clearMessages() {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  guardar_session(datos: any) {
    this.platform.ready().then(() => {
      localStorage.setItem('id', datos.user._id);
      localStorage.setItem('token', datos.token);
      if (datos.user.profile.name) {
        localStorage.setItem('profile', datos.user.profile.name);
      } else {
        localStorage.setItem('profile', datos.user.profile);
      }
      localStorage.setItem('name', datos.user.name);
      localStorage.setItem('lastName', datos.user.lastName);
      localStorage.setItem('businessName', datos.user.businessName);
    });
  }

  leer_session() {
    let session: any;
    this.platform.ready().then(() => {
      session = localStorage.getItem('profile');
    });
    return session;
  }


}
