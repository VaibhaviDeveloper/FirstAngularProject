import { Component, inject, output, signal } from '@angular/core';
import { FormControl, FormGroup, Validators,FormBuilder ,ReactiveFormsModule} from '@angular/forms';
import { HousingServiceService } from '../../services/housing-service.service';
import { HousingLocationInfo } from '../../models/housing-location-info';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-location-form',
  imports: [ReactiveFormsModule],
  templateUrl: './location-form.component.html',
  styleUrl: './location-form.component.css'
})
export class LocationFormComponent {
     
  shouldShowPanel = signal<boolean>(false);
      
    locationAdded = output<void>(); // notify parent when a location is added
    formBuilder = inject(FormBuilder);
    housingService = inject(HousingServiceService);
    router = inject(Router);
    activatedRoute = inject(ActivatedRoute);

    formData = this.formBuilder.group({
    name:           ['', [Validators.required, Validators.minLength(3)]],
    city:           ['', Validators.required],
    state:          ['', Validators.required],
    availableUnits: [0,  [Validators.required, Validators.min(0)]],
    wifi:           [false],
    laundry:        [false],
  });


    ngOnInit(){
        this.showPanel();
    }

     showPanel(){
        this.shouldShowPanel.set(true);
     }

     hidePanel(){
        this.shouldShowPanel.set(false);
        this.formData.reset();
        this.router.navigate(['/'], { relativeTo: this.activatedRoute });
     }
     submitForm() {
    if (this.formData.invalid) return;

    const newLocation: HousingLocationInfo = {
      id:             Date.now(),                                   
      name:           this.formData.value.name!,
      city:           this.formData.value.city!,
      state:          this.formData.value.state!,
      availableUnits: this.formData.value.availableUnits!,
      wifi:           this.formData.value.wifi ?? false,
      laundry:        this.formData.value.laundry ?? false,
      photo:          'https://angular.dev/assets/images/tutorials/common/bernard-hermant-CLKGGwIBTaY-unsplash.jpg',
    };

    this.housingService.addLocation(newLocation);
    this.locationAdded.emit();
    this.hidePanel();
    this.router.navigate(['/'], { relativeTo: this.activatedRoute });
  }
}
