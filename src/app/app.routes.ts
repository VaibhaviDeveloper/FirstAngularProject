import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DetailsComponent } from './components/details/details.component';
import { LinkedSignalDemoComponent } from '@components/linked-signal-demo/linked-signal-demo.component';
import { FormsComponent } from '@components/forms/forms.component';

export const routes: Routes = [
  { 
    path: '',
     redirectTo:'home',
      pathMatch:'full',
     //component: HomeComponent //path:home , redirectTo:'/'
    },
    {
        path:'home',
        component:HomeComponent,
        title:'Home'
    },
  { path: 'details/:id', //component: DetailsComponent ,
    loadComponent:()=>import('./components/details/details.component').then(m=>m.DetailsComponent)
  },
  {
    path:'linked-signal',
    component:LinkedSignalDemoComponent,
    title:'Linked Signal Demo'
},
{
  path:'forms',
  component:FormsComponent,
  title:'Forms Demo'
}
];