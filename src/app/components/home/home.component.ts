import { Component, inject, linkedSignal, signal } from '@angular/core';
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
  selectedIds = signal<Set<number>>(new Set());
  showConfirm = signal(false);

  viewModelList = linkedSignal<HousingLocationViewModel[]>(() => 
    this.housingService.housingLocationList().map(location => ({
    ...location,
    isSelected: false
  })));

toggleMode(): void {
    if (this.mode() === 'edit') {
      this.mode.set('normal');

      this.selectedIds.set(new Set());
    } else {
      this.mode.set('edit');
    }
  }

  handleLocationClicked(location: HousingLocationInfo): void {
    if (this.mode() === 'normal') {
      this.router.navigate(['/details', location.id]);
    } else {
      const current = new Set(this.selectedIds());
      if (current.has(location.id)) {
        current.delete(location.id);
      } else {
        current.add(location.id);
      }
      this.selectedIds.set(current);
    }
  }

  isSelected(id: number): boolean {
    return this.selectedIds().has(id);
  }

  requestDeleteSelected(): void {
    this.showConfirm.set(true);
  }

  cancelDelete(): void {
    this.showConfirm.set(false);
  }

  confirmDeleteSelected(): void {
    this.selectedIds().forEach(id => this.housingService.deleteLocation(id));
    this.selectedIds.set(new Set());
    this.showConfirm.set(false);
    this.mode.set('normal');
  }
}