import { Component, computed, inject, linkedSignal, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocationInfo } from '../../models/housing-location-info';
import { HousingServiceService } from '../../services/housing-service.service';
import { HousingLocationViewModel } from '../housing-location/housing-location-view-model';
import { FormsComponent } from '../forms/forms.component';

type Mode = 'normal' | 'edit';

@Component({
  selector: 'app-home',
  imports: [HousingLocationComponent, FormsComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  private router = inject(Router);
  readonly housingService = inject(HousingServiceService);

  mode        = signal<Mode>('normal');
  //selectedIds = signal<Set<number>>(new Set());
  showConfirm = signal(false);
  showAddForm = signal(false);
justAdded   = signal(false);

  // viewModelList = linkedSignal<HousingLocationViewModel[]>(() => 
  //   this.housingService.locations().map(location => ({
  //     ...location,
  //     isSelected: false
  //   }))
  // );

    private activatedRoute = inject(ActivatedRoute);

    locationsToDisplay = linkedSignal<HousingLocationInfo[], HousingLocationViewModel[]>(
  {
    source:  this.housingService.getAllLocations(),  
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
  }
);

  selectedCount = computed(() => 
  this.locationsToDisplay().filter(loc => loc.isSelected).length
);
toggleMode(): void {
    if (this.mode() === 'edit') {
      this.mode.set('normal');
      this.locationsToDisplay.update(list => list.map(loc => ({ ...loc, isSelected: false })));//resetting the isSelected property of all locations to false when switching back to normal mode.
      //this.selectedIds.set(new Set());
    } else {
      this.mode.set('edit');
    }
  }

//   locationsToDisplay = linkedSignal<HousingLocationInfo[], HousingLocationViewModel[]>(
//   {
//     source: () => this.housingService.locations(),  
//     computation: (newLocations, previousValue): HousingLocationViewModel[] => {
//       const prevViewModels = (previousValue?.value ?? []) as HousingLocationViewModel[];
      
//       return newLocations.map(location => {
//         const matched = prevViewModels.find(prev => prev.id === location.id);
//         return { 
//           ...location, 
//           isSelected: matched?.isSelected ?? false
//         };
//       });                                           
//     }
//   }
// );

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
      this.locationsToDisplay.update(list => list.map(loc => loc.id === location.id ? { ...loc, isSelected: !loc.isSelected } : loc)); //toggling the isSelected property of the clicked location in edit mode.
    }
  }

  // isSelected(id: number): boolean {
  //   return this.locationsToDisplay().some(loc => loc.id === id && loc.isSelected);
  // }

  

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

toggleAddForm(): void {
  this.showAddForm.set(!this.showAddForm());
}

addLocation(): void {
  // const newLocation: HousingLocationInfo = {
  //   id: Date.now(),
  //   name: 'New Property',
  //   city: 'New York',
  //   state: 'NY',
  //   photo: `${this.housingService.baseUrl}/bernard-hermant-CLKGGwIBTaY-unsplash.jpg`,
  //   availableUnits: 3,
  //   wifi: true,
  //   laundry: false,
  // };
  // this.housingService.addLocation(newLocation);

  this.router.navigate(['edit'],{relativeTo:this.activatedRoute });
}
}
// handleLocationAdded(): void {
//   this.showAddForm.set(false);    
//   this.justAdded.set(true);       
//   setTimeout(() => this.justAdded.set(false), 2000);
// }