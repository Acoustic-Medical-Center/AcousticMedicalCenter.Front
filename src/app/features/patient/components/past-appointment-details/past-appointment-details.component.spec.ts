import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastAppointmentDetailsComponent } from './past-appointment-details.component';

describe('PastAppointmentDetailsComponent', () => {
  let component: PastAppointmentDetailsComponent;
  let fixture: ComponentFixture<PastAppointmentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PastAppointmentDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PastAppointmentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
