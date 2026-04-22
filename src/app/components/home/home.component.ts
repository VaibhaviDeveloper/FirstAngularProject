import { Component, computed, inject, linkedSignal, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocationInfo } from '../../models/housing-location-info';
import { HousingServiceService } from '../../services/housing-service.service';
import { HousingLocationViewModel } from '../housing-location/housing-location-view-model';

type Mode = 'normal' | 'edit';

@Component({
  selector: 'app-home',
  imports: [HousingLocationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  private router = inject(Router);
  readonly housingService = inject(HousingServiceService);

  mode        = signal<Mode>('normal');
  //selectedIds = signal<Set<number>>(new Set());
  showConfirm = signal(false);

  viewModelList = linkedSignal<HousingLocationViewModel[]>(() => 
    this.housingService.getAllLocations().map(location => ({
    ...location,
    isSelected: false
  })));

  selectedCount = computed(() => 
  this.viewModelList().filter(loc => loc.isSelected).length
);
toggleMode(): void {
    if (this.mode() === 'edit') {
      this.mode.set('normal');
      this.viewModelList.update(list => list.map(loc => ({ ...loc, isSelected: false })));//resetting the isSelected property of all locations to false when switching back to normal mode.
      //this.selectedIds.set(new Set());
    } else {
      this.mode.set('edit');
    }
  }

  handleLocationClicked(location: HousingLocationInfo): void {
    if (this.mode() === 'normal') {
      this.router.navigate(['/details', location.id]);
    } else {
      // const current = new Set(this.selectedIds());
      // if (current.has(location.id)) {
      //   current.delete(location.id);
      // } else {
      //   current.add(location.id);
      // }
      // this.selectedIds.set(current);
      this.viewModelList.update(list => list.map(loc => loc.id === location.id ? { ...loc, isSelected: !loc.isSelected } : loc)); //toggling the isSelected property of the clicked location in edit mode.
    }
  }

  // isSelected(id: number): boolean {
  //   return this.viewModelList().some(loc => loc.id === id && loc.isSelected);
  // }

  requestDeleteSelected(): void {
    this.showConfirm.set(true);
  }

  cancelDelete(): void {
    this.showConfirm.set(false);
  }

  confirmDeleteSelected(): void {
    this.viewModelList.update(list =>
      list.filter(item => !item.isSelected)  
    );
    this.mode.set('normal');
  }
}