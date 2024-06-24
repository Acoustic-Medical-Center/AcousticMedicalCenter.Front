import { Component } from '@angular/core';
import { PatientSettingsFormComponent } from '../../../features/patient/components/patient-settings-form/patient-settings-form.component';
import { PersonalInformationFormComponent } from '../../../features/patient/components/personal-information-form/personal-information-form.component';
import { PasswordFormPageComponent } from '../../../features/patient/components/password-form-page/password-form-page.component';

@Component({
  selector: 'app-patient-settings',
  standalone: true,
  imports: [PersonalInformationFormComponent, PatientSettingsFormComponent,PasswordFormPageComponent],
  templateUrl: './patient-settings.component.html',
  styleUrl: './patient-settings.component.scss',
})
export class PatientSettingsComponent {}
