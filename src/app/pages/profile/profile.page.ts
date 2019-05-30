import { Component, OnInit } from '@angular/core';
import { MenuController, LoadingController, AlertController, } from '@ionic/angular';
import { ProfileService } from '../../services/profile/profile.service';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  customBackActionSubscription: Subscription;
  // perfil: Array<Object> = [];
  perfil: any = [];

  constructor(private menu: MenuController,
    public _profile: ProfileService,
    public platform: Platform,
    public loadingController: LoadingController,
    public alertController: AlertController,
    private router: Router) { }

  ngOnInit() {
    this._profile.listar_user().subscribe((data => {
      this.perfil = data;
      console.log(data);
    }), error => {
      this.respuestaFail(error.json());
    });
  }

  openFirst() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  doRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 2000);
  }

  edit_perfil(id: any) {
    console.log(id);
    this.router.navigate(['/edit-perfil', id]);
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

}
