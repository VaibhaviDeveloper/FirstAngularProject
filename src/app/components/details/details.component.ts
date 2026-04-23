import { Component, inject, signal, computed, input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HousingServiceService } from '../../services/housing-service.service';
import { HousingLocationInfo } from '../../models/housing-location-info';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  private route          = inject(ActivatedRoute);
  private router         = inject(Router);
  private housingService = inject(HousingServiceService);

  location      = signal<HousingLocationInfo | undefined>(undefined);
  showConfirm   = signal(false);

 // id = input.required<number>();
  hasPrev = computed(() => !!this.housingService.getPrevLocation(this.location()?.id ?? -1));
  hasNext = computed(() => !!this.housingService.getNextLocation(this.location()?.id ?? -1));

  ngOnInit(): void {
   
      this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
     // const id2= this.id();
      this.location.set(this.housingService.getLocationById(id));
      this.showConfirm.set(false); 
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  goNext(): void {
    const next = this.housingService.getNextLocation(this.location()?.id ?? -1);
    if (next) this.router.navigate(['/details', next.id]);
  }

  goPrev(): void {
    const prev = this.housingService.getPrevLocation(this.location()?.id ?? -1);
    if (prev) this.router.navigate(['/details', prev.id]);
  }

  requestDelete(): void {
    this.showConfirm.set(true);
  }

  cancelDelete(): void {
    this.showConfirm.set(false);
  }

  confirmDelete(): void {
    const id = this.location()?.id;
    if (id === undefined) return;
    const next = this.housingService.getNextLocation(id);
    const prev = this.housingService.getPrevLocation(id);

    this.housingService.deleteLocation(id);

    if (next) {
      this.router.navigate(['/details', next.id]);
    } else if (prev) {
      this.router.navigate(['/details', prev.id]);
    } else {
      this.router.navigate(['/']);
    }
  }
}