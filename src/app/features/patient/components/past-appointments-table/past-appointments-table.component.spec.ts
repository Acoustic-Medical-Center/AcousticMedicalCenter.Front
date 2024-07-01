import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastAppointmentsTableComponent } from './past-appointments-table.component';

describe('PastAppointmentsTableComponent', () => {
  let component: PastAppointmentsTableComponent;
  let fixture: ComponentFixture<PastAppointmentsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PastAppointmentsTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PastAppointmentsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
