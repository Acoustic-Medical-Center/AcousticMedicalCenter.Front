import { Component, Input } from '@angular/core';
import { DoctorSettingsFormComponent } from '../doctor-settings-form/doctor-settings-form.component';
import { PersonalFormComponent } from '../personal-form/personal-form.component';

@Component({
  selector: 'app-doctor-edit-form',
  standalone: true,
  imports: [DoctorSettingsFormComponent, PersonalFormComponent],
  templateUrl: './doctor-edit-form.component.html',
  styleUrl: './doctor-edit-form.component.scss',
})
export class DoctorEditFormComponent {
  @Input() doctorId: number | null = null;
}
