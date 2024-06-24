import { Component } from '@angular/core';
import { DoctorSettingsFormComponent } from '../../../features/doctors/components/doctor-settings-form/doctor-settings-form.component';
import { PersonalInformationFormComponent } from '../../../features/doctors/components/personal-information-form/personal-information-form.component';
import { PasswordFormPageComponent } from '../../../features/doctors/components/password-form-page/password-form-page.component';

@Component({
  selector: 'app-doctor-settings',
  standalone: true,
  imports: [
    PersonalInformationFormComponent, 
    DoctorSettingsFormComponent, 
    PasswordFormPageComponent,
    
  ],
  templateUrl: './doctor-settings.component.html',
  styleUrl: './doctor-settings.component.scss',
})
export class DoctorSettingsComponent {}
