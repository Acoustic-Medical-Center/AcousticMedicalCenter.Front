import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DoctorAppointmentsService } from '../../service/doctor-appointments.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-report-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './report-form.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportFormComponent implements OnInit {
  reportForm: FormGroup;
  private _appointmentId: number | undefined;

  @Input()
  set appointmentId(value: number | undefined) {
    this._appointmentId = value;
    if (this.reportForm) {
      this.reportForm.get('appointmentId')?.setValue(this._appointmentId);
    }
  }

  constructor(
    private fb: FormBuilder,
    private doctorAppointmentsService: DoctorAppointmentsService,
    private toastr: ToastrService
  ) {
    this.reportForm = this.fb.group({
      appointmentId: ['', [Validators.required, Validators.min(0)]],
      examinationFindings: ['', Validators.required],
      diagnosis: this.fb.array([], Validators.required),
    });
  }

  ngOnInit() {
    if (this._appointmentId !== undefined) {
      this.reportForm.get('appointmentId')?.setValue(this._appointmentId);
    }
  }

  onSubmit(): void {
    if (this.reportForm.valid) {
      const formData: any = this.reportForm.value;
      this.doctorAppointmentsService.submitReport(formData).subscribe(
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
