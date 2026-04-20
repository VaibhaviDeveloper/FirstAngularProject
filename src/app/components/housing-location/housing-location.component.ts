import { Component, inject, input,output } from '@angular/core';
import { HousingLocationInfo } from '../../models/housing-location-info';
import { HousingServiceService } from '../../services/housing-service.service';

@Component({
  selector: 'app-housing-location',
  imports: [],
  templateUrl: './housing-location.component.html',
  styleUrl: './housing-location.component.css',
  providers:[{provide:HousingServiceService,useClass:HousingServiceService}]
  //[HosingServiceService]
})
export class HousingLocationComponent {
   location = input.required<HousingLocationInfo>();
   onLocationClick = output<HousingLocationInfo>();
      locationList=inject(HousingServiceService);
   handleClick(event: MouseEvent): void {
  console.log(`Clicked on ${this.location().name}`);
  this.onLocationClick.emit(this.location());
}
   }

