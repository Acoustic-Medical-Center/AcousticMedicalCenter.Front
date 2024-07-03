import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DoctorService } from '../../../services/doctor.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-personal-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './personal-form.component.html',
  styleUrl: './personal-form.component.scss'
})
export class PersonalFormComponent {
  settingsPersonalForm: FormGroup;
  userId: string | null = '';

  constructor(
    private fb: FormBuilder,
    private personalService: DoctorService,
    private toastr: ToastrService
  ){
    this.settingsPersonalForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.minLength(6)]],
      gender: [''],
    });
  }

  ngOnInit(): void {
    this.loadPersonalSettings();
    console.log('merhaba')
  }

  loadPersonalSettings() {
    const id = this.userId;
    console.log("userİd", this.userId);
    this.personalService.getUserSettings(id).subscribe(
    
      (settings) => {
        console.log('User Settings: ', settings);

        const filteredSettings = {
          firstName: settings.firstName || '',
          lastName: settings.lastName || '',
          email: settings.email || '',
          phoneNumber: settings.phoneNumber || '',
          gender: settings.gender || '',
        };
        this.settingsPersonalForm.patchValue(filteredSettings);
        console.log(
          'settingsFormValue after user settings:',
          this.settingsPersonalForm.value,
        );
      },
      (error) => {
       this.toastr.error('Error fetching user settings');
       console.log(error);
      },
    );
  }

  onSubmit(): void {
    if (this.settingsPersonalForm.valid) {
      const dirtyValues = this.getDirtyValues(this.settingsPersonalForm);

      if (Object.keys(dirtyValues).length > 0) {
        this.personalService.updateUserSettings(dirtyValues).subscribe(
          (response) => {
            this.toastr.success('User settings updated successfully');
            console.log(response);
          },
          (error) => {
            this.toastr.error('Error updating user settings');
            console.log(error);
          },
        );
      } else {
        this.toastr.warning('No changes to save.');
      }
    } else {
      console.log();
      this.toastr.error('Form geçersiz');
    }
  }
  getDirtyValues(form: FormGroup): any {
    const dirtyValues: any = {};

    Object.keys(form.controls).forEach((key) => {
      const currentControl = form.get(key);

      if (currentControl && currentControl.dirty) {
        dirtyValues[key] = currentControl.value;
      }
    });

    return dirtyValues;
  }
}
