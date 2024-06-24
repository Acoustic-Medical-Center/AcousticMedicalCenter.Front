import { Component } from '@angular/core';
import { PatientSettingsFormComponent } from '../../../features/patient/components/patient-settings-form/patient-settings-form.component';
import { PersonalInformationFormComponent } from '../../../features/patient/components/personal-information-form/personal-information-form.component';

@Component({
  selector: 'app-patient-settings',
  standalone: true,
  imports: [PersonalInformationFormComponent, PatientSettingsFormComponent],
  templateUrl: './patient-settings.component.html',
  styleUrl: './patient-settings.component.scss',
})
export class PatientSettingsComponent {}
