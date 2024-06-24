import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DoctorSettingsService } from '../../service/doctor-settings.service';
import { LocalStorageService } from '../../../../core/browser/services/local-storage.service';

@Component({
  selector: 'app-personal-information-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './personal-information-form.component.html',
  styleUrl: './personal-information-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalInformationFormComponent implements OnInit {
  settingsGeneralPatientForm: FormGroup;
  userId: string | null = '';

  constructor(
    private fb: FormBuilder,
    private settingsService: DoctorSettingsService,
    private localStorageService: LocalStorageService,
  ) {
    this.settingsGeneralPatientForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.minLength(6)]],
      gender: [''],
    });
  }

  ngOnInit(): void {
    this.loadPatientGeneralSettings();
  }

  loadPatientGeneralSettings() {
    this.settingsService.getUserSettings().subscribe(
      (settings) => {
        console.log('User Settings: ', settings);

        const filteredSettings = {
          firstName: settings.firstName || '',
          lastName: settings.lastName || '',
          email: settings.email || '',
          phoneNumber: settings.phoneNumber || '',
          gender: settings.gender || '',
        };
        this.settingsGeneralPatientForm.patchValue(filteredSettings);
        console.log(
          'settingsFormValue after user settings:',
          this.settingsGeneralPatientForm.value,
        );
      },
      (error) => {
        console.log('Error fetching user settings: ', error);
      },
    );
  }

  onSubmit(): void {
    if (this.settingsGeneralPatientForm.valid) {
      const dirtyValues = this.getDirtyValues(this.settingsGeneralPatientForm);

      if (Object.keys(dirtyValues).length > 0) {
        this.settingsService.updateUserSettings(dirtyValues).subscribe(
          (response) => {
            console.log('User settings updated successfully', response);
          },
          (error) => {
            console.error('Error updating user settings:', error);
          },
        );
      } else {
        console.log('No changes to save.');
      }
    } else {
      console.log();
      console.log('Form geçersiz');
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
