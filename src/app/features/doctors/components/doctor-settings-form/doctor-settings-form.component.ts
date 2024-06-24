import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { DoctorSettingsService } from '../../service/doctor-settings.service';
import { IDoctor } from '../../service/doctor-settings.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctor-settings-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './doctor-settings-form.component.html',
  styleUrls: ['./doctor-settings-form.component.scss'],
})
export class DoctorSettingsFormComponent implements OnInit {
  doctorForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private settingsService: DoctorSettingsService,
  ) {
    this.doctorForm = this.fb.group({
      experience: ['', [Validators.required, Validators.min(0)]],
      biography: ['', Validators.required],
      doctorInterests: this.fb.array([], Validators.required),
    });
  }

  ngOnInit(): void {
    this.loadDoctorSettings();
  }

  loadDoctorSettings(): void {
    this.settingsService.getDoctorSettings().subscribe(
      (settings: IDoctor) => {
        this.doctorForm.patchValue({
          experience: settings.experience,
          biography: settings.biography,
        });
        this.setDoctorInterests(settings.doctorInterests);
      },
      (error: any) => {
        console.error('Error fetching doctor settings:', error);
      },
    );
  }

  setDoctorInterests(interests: string[]): void {
    const interestsArray = this.doctorForm.get('doctorInterests') as FormArray;
    interests.forEach((interest) => {
      interestsArray.push(this.fb.control(interest, Validators.required));
    });
  }

  addInterest(): void {
    const interestsArray = this.doctorForm.get('doctorInterests') as FormArray;
    interestsArray.push(this.fb.control('', Validators.required));
  }

  removeInterest(index: number): void {
    const interestsArray = this.doctorForm.get('doctorInterests') as FormArray;
    interestsArray.removeAt(index);
  }

  onSubmit(): void {
    if (this.doctorForm.valid) {
      const doctorData: IDoctor = this.doctorForm.value;
      this.settingsService.updateDoctorSettings(doctorData).subscribe(
        (response: any) => {
          console.log('Doctor settings updated successfully', response);
        },
        (error: any) => {
          console.error('Error updating doctor settings:', error);
        },
      );
    } else {
      console.log('Form is invalid');
    }
  }

  get doctorInterestsControls(): FormArray {
    return this.doctorForm.get('doctorInterests') as FormArray;
  }
}
