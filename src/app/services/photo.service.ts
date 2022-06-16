import { Injectable } from '@angular/core';
import { CameraPhoto, Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Storage } from '@capacitor/storage';
import { Platform } from '@ionic/angular';
import { Foto } from '../models/foto.interface';


@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  //En este arreglo se almacenan las fotos
  public fotos: Foto[];
  constructor(){ }
    
    public async addNewToGallery(){
      //proceso_para_tomar_foto
      const fotoCapturada = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 100
      })

      /*this.fotos.unshift({
        filepath: "foto_",
        webviewPath: fotoCapturada.webPath
      })*/

      const savedImageFile = await this.savePicture(fotoCapturada);
      this.fotos.unshift(savedImageFile);
      
    }
      public async savePicture(cameraPhoto: CameraPhoto){
        
        const base64Data = await this.readAsBase64(cameraPhoto)
        const filename = new Date().getTime + '.jpeg';
        const savedFile = await Filesystem.writeFile({
          path: filename,
          data: base64Data,
          directory: Directory.Data
        })

        return {
          filepath: filename,
          webviewPath:cameraPhoto.webPath
        }        
        //https://www.youtube.com/watch?v=jGEAqQbHNic&t=1050s&ab_channel=IngenieriadeSoftware-UTA VOY EN EL MINUTO 1:14:55hrs

      }
      public async readAsBase64(cameraPhoto: CameraPhoto){
        const response = await fetch (cameraPhoto.webPath!)
        const blob = await response.blob()

        return await this.convertBlobToBase64(blob) as string

      }
      convertBlobToBase64 = (blob: Blob) => new Promise ((resolve, reject) => {
        const reader = new FileReader
        reader.onerror = reject
        reader.obload = () => {
          resolve(reader.result)
        }
      
      })


    }
    




  




