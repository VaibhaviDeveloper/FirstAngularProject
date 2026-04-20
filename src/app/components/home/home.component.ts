import { Component, inject, signal } from '@angular/core';
import { HousingLocationComponent } from "../housing-location/housing-location.component";
import { HousingLocationInfo } from "../../models/housing-location-info";
import { CounterComponent } from "../counter/counter.component";
import { HousingServiceService } from '../../services/housing-service.service';
@Component({
  selector: 'app-home',
  imports: [HousingLocationComponent, CounterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
   
   clickCount = signal(0);
  readonly housingService= inject(HousingServiceService); // This is a hardwired dependency!! And from outside , we can not chnage this dependency.
  //Consuming shared instance maintained by Angular's DI system.

  constructor(){
    this.housingService=inject(HousingServiceService);
  }
handleLocationClicked(location: HousingLocationInfo) {
  this.clickCount.update(count => count + 1);
  //this.housingService.updateLocation(location);
}
}
