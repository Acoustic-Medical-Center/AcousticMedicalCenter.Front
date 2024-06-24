import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { PatientSettingsService } from '../../services/patient-settings.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-settings-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './patient-settings-form.component.html',
  styleUrls: ['./patient-settings-form.component.scss'],
})
export class PatientSettingsFormComponent implements OnInit {
  bloodTypeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private settingsService: PatientSettingsService,
  ) {
    this.bloodTypeForm = this.fb.group({
      bloodType: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadBloodType();
  }

  loadBloodType(): void {
    this.settingsService.getBloodType().subscribe(
      (settings) => {
        console.log('User Settings: ', settings);
        this.bloodTypeForm.patchValue({ bloodType: settings.bloodType || '' });
      },
      (error) => {
        console.error('Error fetching user settings: ', error);
      },
    );
  }

  onSubmit(): void {
    if (this.bloodTypeForm.valid) {
      const bloodType = this.bloodTypeForm.get('bloodType')?.value;

      this.settingsService.updateBloodType(bloodType).subscribe(
        (response) => {
          console.log('Blood type updated successfully', response);
        },
        (error) => {
          console.error('Error updating blood type:', error);
        },
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
