import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DoctorService } from '../../../services/doctor.service';
import { ToastrService } from 'ngx-toastr';
import { IDoctor } from '../../../../doctors/service/doctor-settings.service';

@Component({
  selector: 'app-doctor-settings-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './doctor-settings-form.component.html',
  styleUrl: './doctor-settings-form.component.scss',
})
export class DoctorSettingsFormComponent {
  doctorFormSettings: FormGroup;

  @Input() doctorId!: any | null;

  constructor(
    private fb: FormBuilder,
    private service: DoctorService,
    private toastr: ToastrService,
  ) {
    this.doctorFormSettings = this.fb.group({
      doctorId: ['', Validators.required],
      experience: ['', [Validators.required, Validators.min(0)]],
      biography: ['', Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['doctorId'] && this.doctorId !== null) {
      this.doctorFormSettings.patchValue({ doctorId: this.doctorId });
      this.loadDoctorSettings();
    }
  }

  loadDoctorSettings(): void {
    this.service.getDoctorById(this.doctorId).subscribe(
      (settings: IDoctor) => {
        this.doctorFormSettings.patchValue({
          experience: settings.experience,
          biography: settings.biography,
        });
        console.log('doctorFormSettings Value', this.doctorFormSettings.value);
      },

      (error: any) => {
        this.toastr.error('Error fetching doctor settings');
        console.log(error);
      },
    );
  }

  onSubmit(): void {
    if (this.doctorFormSettings.valid) {
      const doctorData: IDoctor = this.doctorFormSettings.value;

      this.service.updateDoctorSettings(doctorData).subscribe(
        (response: any) => {
          this.toastr.success('Doctor settings updated successfully');
          console.log('Doctor settings updated:', response);
        },
        (error: any) => {
          this.toastr.error('Error updating doctor settings');
          console.error('Error:', error);
        },
      );
    } else {
      this.toastr.warning('Form is invalid');
    }
  }
  get doctorInterestsControls(): FormArray {
    return this.doctorFormSettings.get('doctorInterests') as FormArray;
  }
}
