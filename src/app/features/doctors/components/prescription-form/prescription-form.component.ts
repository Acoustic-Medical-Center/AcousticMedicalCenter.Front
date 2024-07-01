import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormBuilder,FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DoctorAppointmentsService } from '../../service/doctor-appointments.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-prescription-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './prescription-form.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrescriptionFormComponent { 
  prescriptionForm: FormGroup;
  private _appointmentId: number | undefined;

  constructor(
    private fb: FormBuilder,
    private doctorAppointmentsServise: DoctorAppointmentsService,
    private toastr: ToastrService
  ){
    this.prescriptionForm = this.fb.group({
      appointmentId: ['', [Validators.required, Validators.min(0)]],
      medicationDetails: ['', Validators.required],
      dosageInstructions: ['', Validators.required]
    });
  }

  @Input()
  set appointmentId(value: number | undefined) {
    this._appointmentId = value;
    if (this.prescriptionForm) {
      this.prescriptionForm.get('appointmentId')?.setValue(this._appointmentId);
    }
  }
  ngOnInit() {
    if (this._appointmentId !== undefined) {
      this.prescriptionForm.get('appointmentId')?.setValue(this._appointmentId);
    }
  }
  onSubmit(): void {
    if (this.prescriptionForm.valid) {
      const formData: any = this.prescriptionForm.value;
      this.doctorAppointmentsServise.submitPrescription(formData).subscribe(
        (response: any) => {
          this.toastr.success('Report submitted successfully');
          console.log(response);
        },
        (error: any) => {
          this.toastr.error('Error submitting report');
          console.error(error);
        }
      );
    } else {
      this.toastr.warning('Form is invalid');
    }
  }
}
