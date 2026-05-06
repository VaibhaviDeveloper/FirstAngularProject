import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
  initialCount = input.required<number>();
  countChange = output<number>();

  count = signal(0);

  ngOnInit() {
    this.count.set(this.initialCount());
  }

  increment() {
    this.count.update(value => value + 1);
    this.countChange.emit(this.count());
  }

  decrement() {
    this.count.update(value => value - 1);
    this.countChange.emit(this.count());
  }
}