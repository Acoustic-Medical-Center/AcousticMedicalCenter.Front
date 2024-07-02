import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorSettingsFormComponent } from './doctor-settings-form.component';

describe('DoctorSettingsFormComponent', () => {
  let component: DoctorSettingsFormComponent;
  let fixture: ComponentFixture<DoctorSettingsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorSettingsFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoctorSettingsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
