import { Component, Input } from '@angular/core';
import { Table} from 'primeng/table';
import { HousingLocationInfo } from '../../models/housing-location-info';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-location-table',
  standalone: true,
  imports: [CommonModule, Table],
  templateUrl: './location-table.component.html',
  styleUrls: ['./location-table.component.css']
})
export class LocationTableComponent {
 

}
