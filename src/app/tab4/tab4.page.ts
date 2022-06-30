import { Component } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {

  constructor() {}


 async getCurrentLocation(){
    try{
      const cordenadas = await Geolocation.getCurrentPosition();
      console.log(`Current position:`, cordenadas);
    }catch(e){
      console.log(e);
    }
  }  



}
