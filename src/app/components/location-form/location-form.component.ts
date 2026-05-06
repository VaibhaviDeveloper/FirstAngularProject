import { Component, computed, ElementRef, inject, input, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { A11yModule } from '@angular/cdk/a11y';
import { HousingServiceService } from '../../services/housing-service.service';
import { HousingLocationInfo } from '../../models/housing-location-info';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-location-form',
  imports: [ReactiveFormsModule, A11yModule],
  templateUrl: './location-form.component.html',
  styleUrl: './location-form.component.css'
})
export class LocationFormComponent {

  shouldShowPanel = signal<boolean>(false);

  location   = input<HousingLocationInfo | null>(null);
  isEditMode = computed(() => this.location() !== null);

  locationAdded   = output<void>();
  locationUpdated = output<void>();

  formBuilder    = inject(FormBuilder);
  housingService = inject(HousingServiceService);
  
  formData = this.formBuilder.group({
    name:           ['', [Validators.required, Validators.minLength(3)]],
    city:           ['', Validators.required],
    state:          ['', Validators.required],
    availableUnits: [0,  [Validators.required, Validators.min(0)]],
    wifi:           [false],
    laundry:        [false],
    photo:          ['', [Validators.required, Validators.pattern('https?://.+')]],
  });

  private escHandler!: (e: KeyboardEvent) => void;
  private previousOverflow = '';
    ngOnInit() {
    this.showPanel();

    if (this.isEditMode()) {
      this.formData.patchValue({
        name:           this.location()!.name,
        city:           this.location()!.city,
        state:          this.location()!.state,
        availableUnits: this.location()!.availableUnits,
        wifi:           this.location()!.wifi,
        laundry:        this.location()!.laundry,
        photo:          this.location()!.photo,
      });
    }
    this.previousOverflow = document.body.style.overflow;
    // disable background scroll
    document.body.style.overflow = 'hidden';

    // Esc key to close
    this.escHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        this.hidePanel();
      }
    };
    document.addEventListener('keydown', this.escHandler);
  }

  ngOnDestroy() {
    // restore background scroll
     document.body.style.overflow = this.previousOverflow;

    // remove Esc listener
    document.removeEventListener('keydown', this.escHandler);
  }

  showPanel() {
    this.shouldShowPanel.set(true);
  }

  private closePanel() {
    this.shouldShowPanel.set(false);
    this.formData.reset();
    if (this.isEditMode()) {
      this.locationUpdated.emit();
    } else {
      this.locationAdded.emit();
    }
  }

  hidePanel() {
    if (this.formData.dirty) {
      const confirmed = window.confirm('You have unsaved changes. Are you sure you want to cancel?');
      if (!confirmed) return;
    }
    this.closePanel();
  }

  onOverlayClick(event: MouseEvent) {
    if (event.target === event.currentTarget && !this.formData.dirty) {
      this.closePanel();
    }
  }

  submitForm() {
    if (this.formData.invalid) return;

    if (this.isEditMode()) {
      const updated: HousingLocationInfo = {
        id:             this.location()!.id,
        name:           this.formData.value.name!,
        city:           this.formData.value.city!,
        state:          this.formData.value.state!,
        availableUnits: this.formData.value.availableUnits!,
        wifi:           this.formData.value.wifi ?? false,
        laundry:        this.formData.value.laundry ?? false,
        photo:          this.formData.value.photo!,
      };
      this.housingService.updateLocation(updated);
    } else {
      const newLocation: HousingLocationInfo = {
        id:             Date.now(),
        name:           this.formData.value.name!,
        city:           this.formData.value.city!,
        state:          this.formData.value.state!,
        availableUnits: this.formData.value.availableUnits!,
        wifi:           this.formData.value.wifi ?? false,
        laundry:        this.formData.value.laundry ?? false,
        photo:          this.formData.value.photo!,
      };
      this.housingService.addLocation(newLocation);
    }

    this.closePanel();
  }
}