import * as angular from '@ionic/angular';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Component, OnInit } from '@angular/core';
import {Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera'

const IMAGE_DIR = 'stored-images';

interface LocalFile{
  name: string;
  path: string;
  data: string;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor(private platform: angular.Platform) {}

  async ngOnInit() {
    
  }

  async selectImage(){
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType : CameraResultType.Uri,
      source: CameraSource.Camera
    });

    console.log(image);

    if(image) {
      this.saveImage(image);
    }  
  }

  async saveImage(photo: Photo){
    const base64Data = await this.readBase64(photo);
    console.log(base64Data);
    
    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      directory: Directory.Data,
      path:`${IMAGE_DIR}/${fileName}`,
      data: base64Data
    });
    console.log('saved: ', savedFile);
  }

  async readBase64(photo: Photo){
    // "hybrid" will detect Cordova or Capacitor
  if (this.platform.is('hybrid')) {
    // Read the file into base64 format
    const file = await Filesystem.readFile({
      path: photo.path
    });

    return file.data;
  }
  else {
    // Fetch the photo, read as a blob, then convert to base64 format
    const response = await fetch(photo.webPath);
    const blob = await response.blob();

    return await this.convertBlobToBase64(blob) as string;
  }
  }
  convertBlobToBase64(blob: Blob): string | PromiseLike<string> {
    throw new Error('Method not implemented.');
    //si no funciona mirar el siguiente video https://www.youtube.com/watch?v=fU8uM5oU1wY&t=542s&ab_channel=SimonGrimm minuto 13:30
  }




}


