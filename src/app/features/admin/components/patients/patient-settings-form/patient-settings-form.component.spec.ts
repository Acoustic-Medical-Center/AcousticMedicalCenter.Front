import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientSettingsFormComponent } from './patient-settings-form.component';

describe('PatientSettingsFormComponent', () => {
  let component: PatientSettingsFormComponent;
  let fixture: ComponentFixture<PatientSettingsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientSettingsFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatientSettingsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
