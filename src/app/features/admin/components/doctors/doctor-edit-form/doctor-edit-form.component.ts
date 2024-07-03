import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {  DoctorService } from '../../../services/doctor.service';
import { DoctorSettingsFormComponent } from '../doctor-settings-form/doctor-settings-form.component';
import { PersonalFormComponent } from '../personal-form/personal-form.component';


@Component({
  selector: 'app-doctor-edit-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DoctorSettingsFormComponent,
    PersonalFormComponent
  ],
  templateUrl: './doctor-edit-form.component.html',
  styleUrl: './doctor-edit-form.component.scss'
})
export class DoctorEditFormComponent {
  doctorDetailsForm: FormGroup;
  private _doctorId: string | null = null;

  @Input()
  set doctorId(value: string | null){
    this._doctorId= value;
    if (this.doctorDetailsForm) {
      this.doctorDetailsForm.patchValue({doctorId: this._doctorId});
    }
  }

  constructor(
    private fb: FormBuilder,
    private doctorDetailService: DoctorService,
    private toastr: ToastrService
  ){
    this.doctorDetailsForm = this.fb.group({
      doctorId: ['', [Validators.required, Validators.min(0)]],
      experience: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['',[Validators.required]]
    })
  }

  ngOnInit() {
    if (this._doctorId !== undefined) {
      this.doctorDetailsForm.get('doctorId')?.setValue(this._doctorId);
    }
  }

  onSubmit(): void {
    if (this.doctorDetailsForm.valid) {
      const formData = this.doctorDetailsForm.value;
      this.doctorDetailService.getAllDoctors().subscribe(
        (response: any) => {
          this.toastr.success('Doctor details fetched successfully');
          console.log(response);
          // Handle response as needed
        },
        (error: any) => {
          this.toastr.error('Error fetching doctor details');
          console.error(error);
        }
      );
    } else {
      this.toastr.warning('Form is invalid');
    }
  }
}
