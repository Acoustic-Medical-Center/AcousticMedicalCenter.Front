import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PatientSettingsService } from '../../services/settings-service/patient-settings.service';
import { LocalStorageService } from '../../../../core/browser/services/local-storage.service';

@Component({
  selector: 'app-patient-settings-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './patient-settings-form.component.html',
  styleUrl: './patient-settings-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientSettingsFormComponent implements OnInit {
  settingsPatientForm : FormGroup;
  patientId: string | null = '';

  constructor(
    private fb: FormBuilder,
    private settingsService: PatientSettingsService,
    private localStorageService : LocalStorageService
  ){
    this.settingsPatientForm = this.fb.group({
      bloodType: ['']
    })
  }


  ngOnInit(): void {
    this.patientId = this.localStorageService.get<string>('Id');
    if (this.patientId) {
      this.loadPatientSettings(this.patientId);
    }else{
      console.log("Patient id bulunamadı");
    }
  }

  loadPatientSettings(patientId: string) {
    this.settingsService.getPatientSettings(patientId).subscribe(
      (settings) => {
        const filteredSettings = {
          bloodType: settings.bloodType,
        };
        this.settingsPatientForm.patchValue(filteredSettings);
      },
      (error) => {
        console.error('Error fetching doctor settings:', error);
      }
    )
  }
  
  onSubmit(): void {
    if (this.settingsPatientForm.valid && this.patientId) {
      const dirtyValues = this.getDirtyValues(this.settingsPatientForm);

      if (Object.keys(dirtyValues).length > 0) {
        this.settingsService
          .updatePatientSettings(this.patientId,dirtyValues)
          .subscribe(
            (response) => {
              console.log('Patient settings updated successfully', response);
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
