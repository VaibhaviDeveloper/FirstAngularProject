import { Component } from '@angular/core';

@Component({
  selector: 'card-header',
  standalone: true,
  template: `<ng-content />`,
})
export class CardHeader {}