import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
declare let Culqi: any;

@Injectable({
  providedIn: 'root'
})
export class CulqiService {

  settings: any = {
    title: '',
    currency: '',
    description: '',
    amount: 0
  };

  constructor(public http: HttpClient,
    private events: Events) {
    document.addEventListener('payment_event', (token: any) => {
      // Capturamos el token que se creo
      const token_id = token.detail;
      // URL de API
      const url = 'https://api.culqi.com/v2/charges';
      /*
        Disparamos este evento para que mientras el pago se procese,
        un loading cargue la pantalla principal y no se pueda hacer nada
      */
      this.events.publish('on_event_loading_pago', 'Procesando pago');
      /*
        Creamos el headers con el token privado que nos da culqi
        * Recuerda que el Token Privado es diferente al Token Publico
      */
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer sk_test_6tdluVq7qYJppb9z'); // Ingresa tu Private Key Aqui

      const body = JSON.stringify({
        amount: this.settings.amount,
        currency_code: 'PEN',
        email: 'ivanyoe79@gmail.com',
        source_id: token_id
      });

      this.http.post(url, body, { headers: headers }).subscribe(
        response => {
          // Si el pago se realiza, disparamos este evento
          this.events.publish('on_event_pago', response);
        }, error => {
          // Si el pago tiene algun error, disparamos otro evento con el error
          this.events.publish('on_event_pago_error', error);
        });
    }, false);
  }

  initCulqi() {
    // Ingresa tu "Puclic Key" que te da Culqi aqui
    Culqi.publicKey = 'pk_test_1ToDvvGi4xeHYE5I';
  }

  cfgFormulario(descripcion: string, cantidad: number) {
    this.settings.title = 'CargaXpress';
    this.settings.currency = 'PEN';
    this.settings.description = descripcion;
    this.settings.amount = cantidad;

    Culqi.options({
      style: {
        logo: 'https://i.imgur.com/sMI9hlE.png'
      }
    });

    Culqi.settings({
      title: 'CargaXpress',     // Nombre de la empresa
      currency: 'PEN',
      description: descripcion,
      amount: cantidad
    });
  }

  open() {
    Culqi.open();
  }

}
