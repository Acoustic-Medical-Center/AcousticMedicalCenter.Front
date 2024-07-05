import { Component } from '@angular/core';
import { PatientSettingsFormComponent } from '../../../features/patient/components/_settings/patient-settings-form/patient-settings-form.component';
import { PersonalInformationFormComponent } from '../../../features/patient/components/_settings/personal-information-form/personal-information-form.component';
import { PasswordFormPageComponent } from '../../../features/patient/components/_settings/password-form-page/password-form-page.component';
@Component({
  selector: 'app-patient-settings',
  standalone: true,
  imports: [
    PersonalInformationFormComponent,
    PatientSettingsFormComponent,
    PasswordFormPageComponent,
  ],
  templateUrl: './patient-settings.component.html',
  styleUrl: './patient-settings.component.scss',
})
export class PatientSettingsComponent {}
