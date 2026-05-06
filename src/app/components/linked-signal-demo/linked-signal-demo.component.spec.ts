import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkedSignalDemoComponent } from './linked-signal-demo.component';

describe('LinkedSignalDemoComponent', () => {
  let component: LinkedSignalDemoComponent;
  let fixture: ComponentFixture<LinkedSignalDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkedSignalDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkedSignalDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
