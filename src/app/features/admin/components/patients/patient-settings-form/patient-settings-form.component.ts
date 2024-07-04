import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IPatient, PatientService } from '../../../services/patient.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-patient-settings-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './patient-settings-form.component.html',
  styleUrl: './patient-settings-form.component.scss'
})
export class PatientSettingsFormComponent {
  patientFormSettings: FormGroup;

  @Input() patientId!: any | null;

  constructor(
    private fb: FormBuilder,
    private service: PatientService,
    private toastr: ToastrService
  ){
    this.patientFormSettings = this.fb.group({
      patientId: ['', Validators.required],
      bloodType: ['', Validators.required]
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['patientId'] && this.patientId !== null) {
      this.patientFormSettings.patchValue({ doctorId: this.patientId });
      this.loadPatientSettings();
    }
  }

  loadPatientSettings(): void {
    // this.service.getPatientById(this.patientId).subscribe(
    //   (settings: IPatient) => {
    //     this.patientFormSettings.patchValue({
    //       bloodType: settings.bloodType
    //     });
    //     console.log('doctorFormSettings Value', this.patientFormSettings.value);
    //   },

    //   (error: any) => {
    //     this.toastr.error('Error fetching doctor settings');
    //     console.log(error);
    //   },
    // );
  }

  onSubmit(): void {
    if (this.patientFormSettings.valid) {
      const patientData: IPatient = this.patientFormSettings.value;

      // this.service.updatePatientSettings(patientData).subscribe(
      //   (response: any) => {
      //     this.toastr.success('Patient settings updated successfully');
      //     console.log('Patient settings updated:', response);
      //   },
      //   (error: any) => {
      //     this.toastr.error('Error updating patient settings');
      //     console.error('Error:', error);
      //   },
      // );
    } else {
      this.toastr.warning('Form is invalid');
    }
  }
}
