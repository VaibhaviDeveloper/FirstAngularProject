// Add linkedSignal to existing imports
import {Component, signal, computed, linkedSignal, ChangeDetectionStrategy, effect} from '@angular/core';
import { ShippingOptionsComponent } from "@components/shipping-options/shipping-options.component";

@Component({
  selector: 'app-linked-signal-demo',
  imports: [ShippingOptionsComponent],
  templateUrl: './linked-signal-demo.component.html',
  styleUrl: './linked-signal-demo.component.css'
})
export class LinkedSignalDemoComponent {
 userStatus = signal<'online' | 'away' | 'offline'>('offline');
 notificationPreference=signal<boolean>(this.userStatus()==='online');

 notificationEffect = effect(()=>{
   if(this .userStatus()==='online'){
    this.notificationPreference.set(true);
   } else {
    this.notificationPreference.set(false);

   }
 })
//  constructor(){
//   effect(()=>{
//    if(this .userStatus()==='online'){
//     this.notificationPreference.set(true);
//    } else {
//     this.notificationPreference.set(false);

//    }
//  })
//  }

//Linked Signal has a live dependency , supplied as a callback . This callbcak will use dependent signal to compute the value that it wants . However , it is also possible to override the value of linked signal is writable.
 notificationsEnabled = linkedSignal(() => this.userStatus() === 'online');

  statusMessage = computed(() => {
    const status = this.userStatus();
    switch (status) {
      case 'online':
        return 'Available for meetings and messages';
      case 'away':
        return 'Temporarily away, will respond soon';
      case 'offline':
        return 'Not available, check back later';
      default:
        return 'Status unknown';
    }
  });

  isWithinWorkingHours = computed(() => {
    const now = new Date();
    const hour = now.getHours();
    const isWeekday = now.getDay() > 0 && now.getDay() < 6;
    return isWeekday && hour >= 9 && hour < 17 && this.userStatus() !== 'offline';
  });

 goOnline() {
    this.userStatus.set('online');
    //this.notificationPreference.set(true);
  }

  goAway() {
    this.userStatus.set('away');
    //this.notificationPreference.set(false);
  }

  goOffline() {
    this.userStatus.set('offline');
    //this.notificationPreference.set(false);
  }

  toggleStatus() {
    const current = this.userStatus();
    switch (current) {
      case 'offline':
        this.userStatus.set('online');
        
        break;
      case 'online':
        this.userStatus.set('away');
        break;
      case 'away':
        this.userStatus.set('offline');
        break;
    }
  }
  toggleNotifications() {
 // this.notificationsEnabled.set(!this.notificationsEnabled());
 //Implementating the same thing without using LinkedSignal
   this.notificationPreference.update(prev=>!prev);
}

}
