import { Component, input, output } from '@angular/core';
import { HousingLocationInfo } from '../../models/housing-location-info';

@Component({
  selector: 'app-housing-location',
  imports: [],
  templateUrl: './housing-location.component.html',
  styleUrl: './housing-location.component.css',
  
})
export class HousingLocationComponent {
  location   = input.required<HousingLocationInfo>();
  isSelected = input<boolean>(false);
  mode       = input<'normal' | 'edit'>('normal');

  onLocationClick = output<HousingLocationInfo>();
  editClicked = output<HousingLocationInfo>();

  handleClick(): void {
    this.onLocationClick.emit(this.location());
  }

  onEditClick(event: MouseEvent) {
    event.stopPropagation();
    this.editClicked.emit(this.location());
  }

}