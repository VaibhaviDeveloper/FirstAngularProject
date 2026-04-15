import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomeComponent],
 templateUrl: './app.component.html',
 //template:`<h1>Hello {{title}}</h1>`,
  styleUrl: './app.component.css'
  // styles:`
  // h1{
  //   color:blue;
  // }`
})
export class AppComponent {
  //title = 'property2-app';
  protected readonly title = signal('property2-app');

  //setTimeout , event listener is fired , or a promise got resolved/rejected , network call.

  //Specific to the component.

  ngOnInit(){
      console.log('App Component was instantiated');
      this.title.set('property type reloaded');
  }
  
  
}
