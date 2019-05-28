import { Component, OnInit } from '@angular/core';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';

@Component({
  selector: 'app-subir-certificado',
  templateUrl: './subir-certificado.page.html',
  styleUrls: ['./subir-certificado.page.scss'],
})
export class SubirCertificadoPage implements OnInit {

  certificado: any = {
    nombre: null,
    fecha: null,
    archivo: null
  };
  archivo_pdf: String = '';
  constructor(public fileChooser: FileChooser,
    private filePath: FilePath) { }

  ngOnInit() {
  }

  click_open() {
    const filter = { 'mime': 'application/pdf' };
    this.fileChooser.open()
      .then(uri => {
        // console.log(uri);
        this.filePath.resolveNativePath(uri)
          .then(filePath => {
            // console.log(filePath);
            const filename = filePath.substr(filePath.lastIndexOf('/') + 1);
            console.log('file: ' + filePath);
            console.log('filename: ' + filename);
            this.archivo_pdf = filename;
          })
          .catch(err => console.log(err));
      })
      .catch(e => console.log(e));
  }

}
