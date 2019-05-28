import { Component, OnInit } from '@angular/core';
import { ActionSheetController, NavController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { RegisterService } from './../../services/register/register.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
// import { File } from '@ionic-native/file/ngx';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { DriverService } from './../../services/driver/driver.service';
import { FormGroup, FormArray, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
declare var cordova: any;

@Component({
  selector: 'app-new-driver',
  templateUrl: './new-driver.page.html',
  styleUrls: ['./new-driver.page.scss'],
})

export class NewDriverPage implements OnInit {

  NewDriver: any = {
    'picture': null,
    'breveteCategory': null,
    'breveteCode': null,
    'name': null,
    'lastName': null,
    'email': null,
    'documentType': null,
    'documentCode': null,
    'profile': 4,
    'cellphone': null,
    'creatorUser': localStorage.getItem('id')
  };
  filePath: any = null;
  demo: any;
  ip = 'https://carga-api.us-east.mybluemix.net/api/v1/';
  api_new_driver: string = this.ip + 'users';
  api_update_driver: string = this.ip + 'users/';
  titulo: String = 'Nuevo chofer';
  div_update: Boolean = false;
  formularioChofer: FormGroup;

  constructor(public actionSheetController: ActionSheetController,
    private camera: Camera,
    private webview: WebView,
    public _register: RegisterService,
    private transfer: FileTransfer,
    public loadingController: LoadingController,
    public alertController: AlertController,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public navCtrl: NavController,
    public _driver: DriverService,
    public fb: FormBuilder) {
    //   'picture': null,
    // 'breveteCategory': null,
    // 'breveteCode': null,
    // 'name': null,
    // 'lastName': null,
    // 'email': null,
    // 'documentType': null,
    // 'documentCode': null,
    // 'profile': 4,
    // 'cellphone': null,
    // 'creatorUser': localStorage.getItem('id')
    this.formularioChofer = this.fb.group({
      name: ['', [Validators.required, Validators.email]],
      lastName: ['', [Validators.required, Validators.email]],
      documentCode: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      cellphone: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      email: ['', [Validators.required, Validators.email]]
    });
    if (this.activatedRoute.snapshot.paramMap.get('id') === '0') {
    } else {
      this.ObtenerDriver(this.activatedRoute.snapshot.paramMap.get('id'));
      this.titulo = '';
    }
  }

  brevete($event) {
    console.log($event.target.value);
    this.NewDriver.breveteCode = 'Q-' + $event.target.value;
  }

  async ObtenerDriver(id: any) {
    const loading = await this.loadingController.create({
      message: 'Obteniendo información...',
    });
    await loading.present();
    this._driver.get_Driver(id).subscribe((data => {
      this.loadingController.dismiss();
      this.titulo = data.name + ' ' + data.lastName;
      this.div_update = !this.div_update;
      this.demo = data.picture,
        this.NewDriver = {
          'picture': data.picture,
          'breveteCategory': data.breveteCategory,
          'breveteCode': data.breveteCode,
          'name': data.name,
          'lastName': data.lastName,
          'email': data.email,
          'documentType': data.documentType._id.toString(),
          'documentCode': data.documentCode,
          'profile': 4,
          'cellphone': data.cellphone,
          'creatorUser': localStorage.getItem('id')
        };
    }), error => {
      this.respuestaFail(error.json());
    });
  }

  async respuestaFail(error: any) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Falla al intentar comunicarse con el servidor',
      backdropDismiss: false,
      buttons: ['OK']
    });
    await alert.present();
  }

  ngOnInit() {
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      backdropDismiss: false,
      header: 'Agregar imagen',
      buttons: [{
        text: 'Camara',
        icon: 'camera',
        handler: () => {
          this.camara(this.camera.PictureSourceType.CAMERA);
        }
      }, {
        text: 'Galeria',
        icon: 'image',
        handler: () => {
          this.camara(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  camara(sourceType: any) {
    const options: CameraOptions = {
      quality: 50,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    };

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.NewDriver.picture = imageData.substr(imageData.lastIndexOf('/') + 1);
      this.demo = this.webview.convertFileSrc(imageData);
      this.filePath = imageData;
    }, (err) => {
      console.log('Error: ' + err);
    });
  }

  async new_driver() {
    if (this.filePath) {
      const loading = await this.loadingController.create({
        message: 'Registrando...',
      });
      await loading.present();
      const fileTransfer: FileTransferObject = this.transfer.create();
      const options: FileUploadOptions = {
        fileKey: 'picture',
        fileName: this.NewDriver.picture,
        chunkedMode: false,
        mimeType: 'multipart/form-data',
        params: this.NewDriver
      };

      fileTransfer.upload(this.filePath, encodeURI(this.api_new_driver), options)
        .then((data) => {
          // success
          loading.onDidDismiss();
          // const msg =  JSON.parse(data.response);
          console.log(data);
          this.successAlert('Chofer registrado', 'Registrado');
        }, (err) => {
          // error
          console.log(err);
          loading.onDidDismiss();
          const msg = JSON.parse(err.body);
          this.errorAlert(msg.msg);
        });
    } else {
      alert('Le falta la imagen');
    }
  }

  async updateDriver() {
    const loading = await this.loadingController.create({
      message: 'Actualizando información...',
    });
    await loading.present();

    if (this.filePath) {
      const fileTransfer: FileTransferObject = this.transfer.create();
      const options: FileUploadOptions = {
        fileKey: 'picture',
        fileName: this.NewDriver.picture,
        chunkedMode: false,
        mimeType: 'multipart/form-data',
        params: this.NewDriver,
        httpMethod: 'PUT'
      };

      fileTransfer.upload(this.filePath, encodeURI(this.api_update_driver + this.activatedRoute.snapshot.paramMap.get('id')), options)
        .then((data) => {
          // success
          loading.onDidDismiss();
          const msg = JSON.parse(data.response);
          console.log(data);
          this.successAlert(msg.msg, 'Actualizado');
        }, (err) => {
          // error
          loading.onDidDismiss();
          const msg = JSON.parse(err._body);
          this.errorAlert(msg.msg);
        });
    } else {
      this._driver.update_Driver(this.activatedRoute.snapshot.paramMap.get('id'), this.NewDriver).subscribe((data) => {
        loading.onDidDismiss();
        this.successAlert(data.msg, 'Actualizado');
      }, (err) => {
        // error
        loading.onDidDismiss();
        const msg = JSON.parse(err._body);
        this.errorAlert(msg.msg);
      });
    }


  }

  async successAlert(body: any, inf: any) {
    console.log('Mensaje : ' + body);
    this.loadingController.dismiss();
    const alert = await this.alertController.create({
      header: inf,
      backdropDismiss: false,
      subHeader: body,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.navCtrl.navigateBack('/tabs/Conductores');
          }
        }
      ]
    });
    await alert.present();
  }

  async errorAlert(err: any) {
    this.loadingController.dismiss();
    const alert = await this.alertController.create({
      backdropDismiss: false,
      header: 'Error',
      subHeader: 'error al registrar chofer',
      message: err,
      buttons: ['OK']
    });
    await alert.present();
  }

  public pathForImage(img: any) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }
}
