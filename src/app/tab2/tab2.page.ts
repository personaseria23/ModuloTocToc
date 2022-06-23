import { Component, OnInit } from '@angular/core';
import { GlobalService } from './../services/global/global.service';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  loc = 'Locating...';
  constructor(
    private global: GlobalService
  ) { }

  ngOnInit() {
    this.getCurrentLocation();
  }
  async getCurrentLocation() {
    try {
      const coordinates = await this.global.getCurrentLocation();
      console.log('Current position:', coordinates);
      this.getAddress(coordinates);
    } catch(e) {
      console.log(e);
    }
  }
  async getAddress(coordinates) {
    try {
      const address = await this.global.reverseGeocoder(coordinates.coords.latitude, coordinates.coords.longitude);
      console.log('address: ', address);
      this.loc = 
        (address?.subLocality ? address?.subLocality + ', ' : '') + 
        (' - ' + address?.postalCode + ', ') + 
        (address?.locality + ', ') + 
        (address?.administrativeArea ? address?.administrativeArea + ', ' : '') + 
        (address?.countryName);
        
      const coords = await this.global.forwardGeocoder(this.loc);
      console.log('forward geocoder result: ', coords);
    } catch(e) {
      console.log(e);
    }
  }
  async enableLocation() {
    try {
      const status = await this.global.requestLocationPermission();
      console.log(status);
      if(status?.location == 'granted') {
        const stat = await this.global.enableLocation();
        if(stat) {
          const coordinates = await this.global.getCurrentLocation();
          console.log(coordinates);
          this.getAddress(coordinates);
        }
      }
    } catch(e) {
      console.log(e);
    }
  }
}
