import { Component, input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { HousingLocationInfo } from '../../models/housing-location-info';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-location-table',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './location-table.component.html',
  styleUrls: ['./location-table.component.css']
})
export class LocationTableComponent {
  locations = input.required<HousingLocationInfo[]>();
}
