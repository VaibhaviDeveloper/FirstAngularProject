import { Component, computed, inject, linkedSignal, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocationInfo } from '../../models/housing-location-info';
import { HousingServiceService } from '../../services/housing-service.service';
import { HousingLocationViewModel } from '../housing-location/housing-location-view-model';
import { LocationFormComponent } from '../location-form/location-form.component';

type Mode = 'normal' | 'edit';

@Component({
  selector: 'app-home',
  imports: [HousingLocationComponent, RouterOutlet, LocationFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  readonly housingService = inject(HousingServiceService);

  mode           = signal<Mode>('normal');
  showConfirm    = signal(false);
  showAddForm    = signal(false);
  locationToEdit = signal<HousingLocationInfo | null>(null);

  locationsToDisplay = linkedSignal<HousingLocationInfo[], HousingLocationViewModel[]>({
    source: this.housingService.getAllLocations(),
    computation: (newLocations, previousValue): HousingLocationViewModel[] => {
      const prevViewModels = (previousValue?.value ?? []) as HousingLocationViewModel[];
      return newLocations.map(location => {
        const matched = prevViewModels.find(prev => prev.id === location.id);
        return {
          ...location,
          isSelected: matched?.isSelected ?? false
        };
      });
    }
  });

  selectedCount = computed(() =>
    this.locationsToDisplay().filter(loc => loc.isSelected).length
  );

  toggleMode(): void {
    if (this.mode() === 'edit') {
      this.mode.set('normal');
      this.locationsToDisplay.update(list => list.map(loc => ({ ...loc, isSelected: false })));
    } else {
      this.mode.set('edit');
    }
  }

  handleLocationClicked(location: HousingLocationInfo): void {
    if (this.mode() === 'normal') {
      this.router.navigate(['/details', location.id]);
    } else {
      this.locationsToDisplay.update(list =>
        list.map(loc => loc.id === location.id ? { ...loc, isSelected: !loc.isSelected } : loc)
      );
    }
  }

  requestDeleteSelected(): void {
    this.showConfirm.set(true);
  }

  cancelDelete(): void {
    this.showConfirm.set(false);
  }

  confirmDeleteSelected(): void {
    const selectedIds = this.locationsToDisplay()
      .filter(item => item.isSelected)
      .map(item => item.id);
    this.housingService.deleteMultipleLocations(selectedIds);
    this.showConfirm.set(false);
    this.mode.set('normal');
  }

  addLocation(): void {
    this.showAddForm.set(true);
  }

  onLocationAdded(): void {
    this.showAddForm.set(false);
  }

  onEditClicked(location: HousingLocationInfo): void {
    this.locationToEdit.set(location);
  }

  onLocationUpdated(): void {
    this.locationToEdit.set(null);
  }
}