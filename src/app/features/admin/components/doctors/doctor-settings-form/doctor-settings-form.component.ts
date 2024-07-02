import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DoctorService } from '../../../services/doctor.service';
import { ToastrService } from 'ngx-toastr';
import { IDoctor } from '../../../../doctors/service/doctor-settings.service';

@Component({
  selector: 'app-doctor-settings-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './doctor-settings-form.component.html',
  styleUrl: './doctor-settings-form.component.scss'
})
export class DoctorSettingsFormComponent {
  doctorFormSettings: FormGroup;
  doctorId:any ='';

 constructor(
  private fb: FormBuilder,
  private service: DoctorService,
  private toastr: ToastrService
 ){
    this.doctorFormSettings = this.fb.group({
      experience: ['', [Validators.required, Validators.min(0)]],
      biography: ['', Validators.required],
      doctorInterests: this.fb.array([], Validators.required),
    });
  }
  ngOnInit(): void {
    this.loadDoctorSettings();
  }

  loadDoctorSettings(): void {
    this.service.getDoctorById(this.doctorId).subscribe(
      (settings: IDoctor) =>{
        this.doctorFormSettings.patchValue({
          id: [null, Validators.required],
          experience: [null, Validators.required],
          biography: [''],
          doctorInterests: this.fb.array([]) 
        });
        this.setDoctorInterests(settings.doctorInterests);
      },
      (error:any) => {
        this.toastr.error('Error fetching doctor settings');
        console.log(error);
      }
    )
  }
  setDoctorInterests(interests: string[]): void {
    const interestsArray = this.doctorFormSettings.get('doctorInterests') as FormArray;
    interests.forEach((interest) => {
      interestsArray.push(this.fb.control(interest, Validators.required));
    });
  }

  onSubmit(): void {
    if (this.doctorFormSettings.valid) {
      const doctorData = this.doctorFormSettings.value;

      this.service.updateDoctorSettings(doctorData).subscribe(
        (response: any) => {
          this.toastr.success('Doctor settings updated successfully');
          console.log('Doctor settings updated:', response);
        },
        (error: any) => {
          this.toastr.error('Error updating doctor settings');
          console.error('Error:', error);
        }
      );
    } else {
      this.toastr.warning('Form is invalid');
    }
  }
  get doctorInterestsControls(): FormArray {
    return this.doctorFormSettings.get('doctorInterests') as FormArray;
  }
}
