import { Component, Input } from '@angular/core';
import { PatientSettingsFormComponent } from '../patient-settings-form/patient-settings-form.component';
import { PersonalFormComponent } from '../personal-form/personal-form.component';

@Component({
  selector: 'app-patient-edit-form',
  standalone: true,
  imports: [PatientSettingsFormComponent, PersonalFormComponent],
  templateUrl: './patient-edit-form.component.html',
  styleUrl: './patient-edit-form.component.scss'
})
export class PatientEditFormComponent {
  @Input() patientId: number | null = null;
}
