import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'imageSanitizer'
})
export class ImageSanitizerPipe implements PipeTransform {

  constructor( private domSanitizer: DomSanitizer ) {}

  transform( img: any ): any {
    console.log(img);
    console.log(this.domSanitizer.bypassSecurityTrustUrl( img ));
    return  this.domSanitizer.bypassSecurityTrustUrl( img ) ;
  }

}
