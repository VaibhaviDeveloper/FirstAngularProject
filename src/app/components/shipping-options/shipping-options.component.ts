import { Component, linkedSignal, signal } from '@angular/core';
interface ShippingMethod {
    id: number;
    name: string;
}

@Component({
  selector: 'app-shipping-options',
  imports: [],
  templateUrl: './shipping-options.component.html',
  styleUrl: './shipping-options.component.css'
})


export class ShippingOptionsComponent {
     shippingOptions = signal<string[]>([
    'Air',
    'Sea',
    'Road'
     ])

     userSelectedShippingOption = linkedSignal(()=>this.shippingOptions()[0]);

     changeShippingOption(){
        this.shippingOptions.set([
      'Email',
      'Sea',
      'Postal Service',
    ]);
     }
     handleUserInput(event:Event){
            const userSelectedOptionName = (event.target as HTMLInputElement).value;
           console.log((event.target as HTMLInputElement).value);
           this.userSelectedShippingOption.set(userSelectedOptionName);
     }
}
