import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DetailsComponent } from './components/details/details.component';
import { LinkedSignalDemoComponent } from '@components/linked-signal-demo/linked-signal-demo.component';
import { FormsComponent } from '@components/forms/forms.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'details/:id', component: DetailsComponent },
  {
    path:'linked-signal',
    component:LinkedSignalDemoComponent,
    title:'Linked Signal Demo'
},
{
  path:'forms',
  component:FormsComponent
}
];