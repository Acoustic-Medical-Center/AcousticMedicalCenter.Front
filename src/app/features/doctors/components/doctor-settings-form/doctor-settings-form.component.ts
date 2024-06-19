import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DoctorSettingsService } from '../../service/settings-service/doctor-settings.service';
import { LocalStorageService } from '../../../../core/browser/services/local-storage.service';

@Component({
  selector: 'app-doctor-settings-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './doctor-settings-form.component.html',
  styleUrls: ['./doctor-settings-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DoctorSettingsFormComponent implements OnInit {
  settingsDoctorForm: FormGroup;
  doctorId: string | null = '';

  constructor(
    private fb: FormBuilder,
    private settingsService: DoctorSettingsService,
    private localStorageService: LocalStorageService,
  ) {
    this.settingsDoctorForm = this.fb.group({
      experience: [''],
      biography: [''],
    });
  }

  ngOnInit(): void {
    this.doctorId = this.localStorageService.get<string>('Id');

    if (this.doctorId) {
      this.loadDoctorSettings(this.doctorId);
    } else {
      console.log('Doctor id bulunamadı');
    }
  }

  loadDoctorSettings(doctorId: string) {
    this.settingsService.getDoctorSettings(doctorId).subscribe(
      (settings) => {
        console.log('Doctor Settings:', settings);
        const filteredSettings = {
          experience: settings.experience,
          biography: settings.biography,
        };
        this.settingsDoctorForm.patchValue(filteredSettings);
        console.log(
          'settingsFormValue after doctor settings:',
          this.settingsDoctorForm.value,
        );
      },
      (error) => {
        console.error('Error fetching doctor settings:', error);
      },
    );
    console.log('Doctor güncellendi:', doctorId);
  }

  onSubmit(): void {
    if (this.settingsDoctorForm.valid && this.doctorId) {
      const dirtyValues = this.getDirtyValues(this.settingsDoctorForm);

      if (Object.keys(dirtyValues).length > 0) {
        this.settingsService
          .updateDoctorSettings(this.doctorId, dirtyValues)
          .subscribe(
            (response) => {
              console.log('Doctor settings updated successfully', response);
            },
            (error) => {
              console.error('Error updating doctor settings:', error);
            },
          );
      } else {
        console.log('No changes to save.');
      }
    } else {
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
