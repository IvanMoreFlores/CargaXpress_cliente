import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuController, LoadingController, AlertController, } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../services/profile/profile.service';
import { ComponentFactoryResolver } from '@angular/core/src/render3';

@Component({
  selector: 'app-edit-perfil',
  templateUrl: './edit-perfil.page.html',
  styleUrls: ['./edit-perfil.page.scss'],
})
export class EditPerfilPage implements OnInit {
  perfil: any = {
    acceptedRequests: null,
    addresses: [],
    businessName: null,
    businessReason: null,
    cellphone: null,
    country: null,
    createdAt: null,
    documentCode: null,
    documentType: { _id: null, name: null, __v: null },
    email: null,
    lastName: null,
    name: null,
    paymentMethods: [],
    phone: null,
    profile: { _id: null, name: null, description: null, __v: null },
    rejectedRequests: null,
    requests: null,
    ruc: null,
    status: null,
    updatedAt: null,
    userType: null,
    __v: null,
    _id: null
  };
  public editForm: FormGroup;
  constructor(public router: Router,
    public formBuilder: FormBuilder,
    public _profile: ProfileService,
    public loadingController: LoadingController,
    public alertController: AlertController) {
    this.editForm = this.formBuilder.group({
      Nombres: ['', Validators.required],
      Apellidos: ['', Validators.required],
      t_documento: [''],
      n_documento: ['', Validators.required],
      t_cliente: [''],
      r_social: ['', Validators.required],
      ruc: ['', Validators.required],
      r_comercial: [''],
      phone: ['', Validators.required],
      celphone: ['', Validators.required],
      country: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  ngOnInit() {
    this._profile.listar_user().subscribe((data => {
      this.perfil = data;
      console.log(data);
      console.log(this.editForm.valid);
    }), error => {
      this.respuestaFail(error.json());
    });
  }

  cerrar() {
    this.router.navigateByUrl('/tabs/Perfil');
  }

  edit_perfil() {
    console.log(this.perfil);
  }

  async respuestaFail(error: any) {
    console.log(error);
    if (error.msg) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: error.msg,
        buttons: ['OK']
      });
      await alert.present();
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Falla al intentar comunicarse con el servidor',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  pasarString(id: number) {
    if (id) {
      return (id.toString());
    }
  }

}
