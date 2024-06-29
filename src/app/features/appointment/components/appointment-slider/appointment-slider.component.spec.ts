import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentSliderComponent } from './appointment-slider.component';

describe('AppointmentSliderComponent', () => {
  let component: AppointmentSliderComponent;
  let fixture: ComponentFixture<AppointmentSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentSliderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppointmentSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
