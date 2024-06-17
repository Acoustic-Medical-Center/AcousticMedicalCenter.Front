import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-patient-general-settings-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './patient-general-settings-form.component.html',
  styleUrl: './patient-general-settings-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientGeneralSettingsFormComponent { 
  settingsGeneralPatientForm: FormGroup;
}
