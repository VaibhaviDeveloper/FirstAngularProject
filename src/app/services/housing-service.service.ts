import { Injectable, signal } from '@angular/core';
import { HousingLocationInfo } from '../models/housing-location-info';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

//Telling angualar's injector sustem , that it should create an instance of HousingServiceService when it is required and that this instance should be shared across the entire application.

//Provider part.
@Injectable({
  providedIn: 'root'
})
export class HousingServiceService {
 
  readonly baseUrl = 'https://angular.dev/assets/images/tutorials/common';
    
    
private readonly housingLocationList: HousingLocationInfo[] =[
    {
      id: 0,
      name: 'Acme Fresh Start Housing',
      city: 'Chicago',
      state: 'IL',
      photo: `${this.baseUrl}/bernard-hermant-CLKGGwIBTaY-unsplash.jpg`,
      availableUnits: 4,
      wifi: true,
      laundry: true,
    },
    {
      id: 1,
      name: 'A113 Transitional Housing',
      city: 'Santa Monica',
      state: 'CA',
      photo: `${this.baseUrl}/brandon-griggs-wR11KBaB86U-unsplash.jpg`,
      availableUnits: 0,
      wifi: false,
      laundry: true,
    },
    {
      id: 2,
      name: 'Warm Beds Housing Support',
      city: 'Juneau',
      state: 'AK',
      photo: `${this.baseUrl}/i-do-nothing-but-love-lAyXdl1-Wmc-unsplash.jpg`,
      availableUnits: 1,
      wifi: false,
      laundry: false,
    },
    {
      id: 3,
      name: 'Homesteady Housing',
      city: 'Chicago',
      state: 'IL',
      photo: `${this.baseUrl}/ian-macdonald-W8z6aiwfi1E-unsplash.jpg`,
      availableUnits: 1,
      wifi: true,
      laundry: false,
    },
    {
      id: 4,
      name: 'Happy Homes Group',
      city: 'Gary',
      state: 'IN',
      photo: `${this.baseUrl}/krzysztof-hepner-978RAXoXnH4-unsplash.jpg`,
      availableUnits: 1,
      wifi: true,
      laundry: false,
    },
    {
      id: 5,
      name: 'Hopeful Apartment Group',
      city: 'Oakland',
      state: 'CA',
      photo: `${this.baseUrl}/r-architecture-JvQ0Q5IkeMM-unsplash.jpg`,
      availableUnits: 2,
      wifi: true,
      laundry: true,
    },
    {
      id: 6,
      name: 'Seriously Safe Towns',
      city: 'Oakland',
      state: 'CA',
      photo: `${this.baseUrl}/phil-hearing-IYfp2Ixe9nM-unsplash.jpg`,
      availableUnits: 5,
      wifi: true,
      laundry: true,
    },
    {
      id: 7,
      name: 'Hopeful Housing Solutions',
      city: 'Oakland',
      state: 'CA',
      photo: `${this.baseUrl}/r-architecture-GGupkreKwxA-unsplash.jpg`,
      availableUnits: 2,
      wifi: true,
      laundry: true,
    },
    {
      id: 8,
      name: 'Seriously Safe Towns',
      city: 'Oakland',
      state: 'CA',
      photo: `${this.baseUrl}/saru-robert-9rP3mxf8qWI-unsplash.jpg`,
      availableUnits: 10,
      wifi: false,
      laundry: false,
    },
    {
      id: 9,
      name: 'Capital Safe Towns',
      city: 'Portland',
      state: 'OR',
      photo: `${this.baseUrl}/webaliser-_TPTXZd9mOo-unsplash.jpg`,
      availableUnits: 6,
      wifi: true,
      laundry: true,
    },
  ];

private locations = signal<HousingLocationInfo[]>(this.housingLocationList);

  getAllLocations(){
    return this.locations.asReadonly();
  }
  
  getLocationById(id: number): HousingLocationInfo | undefined {
  return this.locations().find(loc => loc.id === id);
}


getNextLocation(id: number): HousingLocationInfo | undefined {
    const list = this.locations();
    const index = list.findIndex(loc => loc.id === id);
    return index !== -1 && index < list.length - 1 ? list[index + 1] : undefined;
}

getPrevLocation(id: number): HousingLocationInfo | undefined {
    const list = this.locations();
    const index = list.findIndex(loc => loc.id === id);
    return index > 0 ? list[index - 1] : undefined;
}

deleteLocation(id: number): void {
    this.locations.update(list => list.filter(loc => loc.id !== id));
}
deleteMultipleLocations(ids: number[]): void {
  this.locations.update(list => list.filter(loc => !ids.includes(loc.id)));
}
addLocation(location: HousingLocationInfo): void {
  this.locations.update(list => [...list, location]);
}
updateLocation(updated: HousingLocationInfo): void {
  this.locations.update(list => 
    list.map(loc => loc.id === updated.id ? updated : loc)
  );
}
searchLocations(query: string): Observable<HousingLocationInfo[]> {
  if (!query) {
    return of(this.locations());
  }

  const q = query.toLowerCase();
  const results = this.locations().filter(loc =>
    loc.city.toLowerCase().includes(q) ||
    loc.name.toLowerCase().includes(q) ||
    loc.state.toLowerCase().includes(q)
  );
  return of(results).pipe(delay(200));
}
}
