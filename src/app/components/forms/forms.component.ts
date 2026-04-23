import { Component, inject, output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HousingLocationInfo } from '../../models/housing-location-info';
import { HousingServiceService } from '../../services/housing-service.service';

@Component({
  selector: 'app-forms',
  imports: [ReactiveFormsModule],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css'
})
export class FormsComponent {

  // readonly housingService = inject(HousingServiceService);

  // onLocationAdded = output<void>();  

  // addLocationForm = new FormGroup({
  //   name:           new FormControl('', Validators.required),
  //   city:           new FormControl('', Validators.required),
  //   state:          new FormControl('', Validators.required),
  //   availableUnits: new FormControl(0, [Validators.required, Validators.min(0)]),
  //   wifi:           new FormControl(false),
  //   laundry:        new FormControl(false),
  // });

  // onSubmit(): void {
  //   if (this.addLocationForm.invalid) {
  //     this.addLocationForm.markAllAsTouched();
  //     return;
  //   }

  //   const formValue = this.addLocationForm.value;
  //   const newLocation: HousingLocationInfo = {
  //     id: Date.now(),
  //     name: formValue.name!,
  //     city: formValue.city!,
  //     state: formValue.state!,
  //     photo: `https://angular.dev/assets/images/tutorials/common/bernard-hermant-CLKGGwIBTaY-unsplash.jpg`,
  //     availableUnits: formValue.availableUnits!,
  //     wifi: formValue.wifi!,
  //     laundry: formValue.laundry!,
  //   };

  //   this.housingService.addLocation(newLocation);  
  //   this.addLocationForm.reset();
  //   this.onLocationAdded.emit();                   
  // }
     profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    address: new FormGroup({
      street: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      zip: new FormControl(''),
    }),
  });
    name = new FormControl('');

    handleChange(){
      console.log(this.name.value);
    }

    updateName(){
      this.name.setValue('VAIBHAVIIII')
    }
    onSubmit() {
    console.warn(this.profileForm.value);
  }

  updateForm(){
    this.profileForm.patchValue({
      firstName:'Vaibhavi',
      address:{
      city:'Kasaragod'  
      }
    })
  }
}