import { Component, input,output } from '@angular/core';
import { HousingLocationInfo } from '../../models/housing-location-info';

@Component({
  selector: 'app-housing-location',
  imports: [],
  templateUrl: './housing-location.component.html',
  styleUrl: './housing-location.component.css'
})
export class HousingLocationComponent {
   location = input.required<HousingLocationInfo>();
   onLocationClick = output<HousingLocationInfo>();
      
   handleClick(event: MouseEvent): void {
  console.log(`Clicked on ${this.location().name}`);
  this.onLocationClick.emit(this.location());
}
   }

