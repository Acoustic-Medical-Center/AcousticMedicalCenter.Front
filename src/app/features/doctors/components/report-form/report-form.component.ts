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
export class ReportFormComponent implements OnInit{
  reportForm: FormGroup;
  @Input() appointmentId: number | undefined;
  constructor(
    private fb: FormBuilder,
    private doctorAppointmentsService: DoctorAppointmentsService,
    private toastr: ToastrService
  ) {
    this.reportForm = this.fb.group({
      appointmentId: ['appointmentId', [Validators.required, Validators.min(0)]],
      examinationFindings: ['', Validators.required],
      diagnosis: this.fb.array([], Validators.required),
    });
  }
  onSubmit(): void {
    if (this.reportForm.valid) {
      const formData: any = this.reportForm.value;
      this.doctorAppointmentsService.submitReport(formData).subscribe(
        (response: any) => {
         this.toastr.success(' successfully');
         console.log(response);
        },
        (error: any) => {
          this.toastr.error('Error');
          console.log(error);
        },
      );
    } else {
      this.toastr.warning('Form is invalid');
    }
  }
  ngOnInit() {
    console.log('mahmut');
    if (this.appointmentId !== undefined) {
      this.reportForm.get('appointmentId')?.setValue(this.appointmentId);
    }
  }
}
