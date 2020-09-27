import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';

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

  constructor(private camera: Camera, private file: File) {}

  camara() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    };

    this.procesarImagen( options );
  }

  libreria() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
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
      const img = window.Ionic.WebView.convertFileSrc( imageData );
      console.log(img);
      console.log(imageData);

      console.log();

      let saveImg = `data:image/jpeg;base64,${imageData}`;

      this.imgD = JSON.stringify(img);
      this.imgDD = JSON.stringify(imageData);

      this.tempImages.push( img );

      const tempFilename = img.substr(img.lastIndexOf('/') + 1);

      const tempBaseFilesystemPath = img.substr(0, img.lastIndexOf('/') + 1);

      const newBaseFilesystemPath = this.file.dataDirectory;

      this.file.copyFile(tempBaseFilesystemPath, tempFilename,
        newBaseFilesystemPath, tempFilename);

    }, (err) => {
      // Handle error
      console.log(err);
    });
  }

}
