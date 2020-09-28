import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { DomSanitizer } from '@angular/platform-browser';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';

declare var window: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public imgD = '';
  public imgDD = '';
  public tempImages = [];
  public base64StringData;
  public error = false;
  public erroText = '';

  public exampleImagePath = '';

  constructor(private camera: Camera, private file: File, public base64: Base64, private sanitizer: DomSanitizer, private barcodeScanner: BarcodeScanner) {}

  camara() {
    const options: CameraOptions = {
      quality: 90,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA,
      correctOrientation: true,
      targetWidth: 1000,
      targetHeight: 1000
    };

    this.procesarImagen( options );
  }

  libreria() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };

    this.procesarImagen( options );
  }

  procesarImagen( options: CameraOptions ) {

    this.camera.getPicture(options).then( ( imageData ) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      // const img = window.Ionic.WebView.convertFileSrc( imageData );

      // this.imgD = JSON.stringify(img);
      this.imgDD = JSON.stringify(imageData);
      // this.imgDD = this.imgDD.substring(1);

      console.log(imageData);
      console.log('procesar imagen');

      // const img = window.Ionic.WebView.convertFileSrc( imageData );

      this.erroText = this.imgDD.substring(0, 50);
      /* this.base64.encodeFile(this.imgDD).then((base64File: string) => {
        console.log(base64File);
        this.base64StringData = base64File;
      }, (err) => {
        console.log(err);
        this.erroText = JSON.stringify(err);
        this.error = true;
      }); */

      const imagePath = imageData;
      console.log(this.imgDD);
      this.tempImages.push(imagePath);
      this.exampleImagePath = 'data:image/jpeg;base64,' + imagePath;

      // const tempFilename = img.substr(img.lastIndexOf('/') + 1);

      // const tempBaseFilesystemPath = img.substr(0, img.lastIndexOf('/') + 1);

      // const newBaseFilesystemPath = this.file.dataDirectory;

      // this.file.copyFile(tempBaseFilesystemPath, tempFilename, newBaseFilesystemPath, tempFilename);
    }, (err) => {
      // Handle error
      console.log(err);
      this.error = true;
    });
  }

  barcode() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', JSON.stringify(barcodeData));
    }).catch(err => {
      console.log('Error', err);
    });
  }
}
