import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { IonicModule } from '@ionic/angular';
import { NewDriverPage } from './new-driver.page';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file';

const routes: Routes = [
  {
    path: '',
    component: NewDriverPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NewDriverPage],
  providers: [WebView, FileTransfer]
})
export class NewDriverPageModule { }
