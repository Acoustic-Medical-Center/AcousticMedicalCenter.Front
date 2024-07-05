import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingAppointmentsListComponent } from './upcoming-appointments-list.component';

describe('UpcomingAppointmentsListComponent', () => {
  let component: UpcomingAppointmentsListComponent;
  let fixture: ComponentFixture<UpcomingAppointmentsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpcomingAppointmentsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpcomingAppointmentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
