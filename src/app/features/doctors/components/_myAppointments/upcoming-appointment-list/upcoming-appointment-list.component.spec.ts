import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingAppointmentListComponent } from './upcoming-appointment-list.component';

describe('UpcomingAppointmentListComponent', () => {
  let component: UpcomingAppointmentListComponent;
  let fixture: ComponentFixture<UpcomingAppointmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpcomingAppointmentListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpcomingAppointmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
