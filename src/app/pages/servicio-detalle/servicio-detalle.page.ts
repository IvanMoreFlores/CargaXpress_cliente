import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../../services/servicio/servicio.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
@Component({
  selector: 'app-servicio-detalle',
  templateUrl: './servicio-detalle.page.html',
  styleUrls: ['./servicio-detalle.page.scss'],
})
export class ServicioDetallePage implements OnInit {
  servicio: any = {};
  constructor(public service: ServicioService,
    private activatedRoute: ActivatedRoute) {
    console.log(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.service.servicios_id(this.activatedRoute.snapshot.paramMap.get('id')).subscribe((data) => {
      console.log(data);
      this.servicio = data;
    });
  }

  devolver_fecha(fecha: any) {
    return (moment(fecha).format('DD-MM-YYYY'));
  }

  devolver_hora(fecha: any) {
    return (moment(fecha).format('h:mm:ss a'));
  }

}
