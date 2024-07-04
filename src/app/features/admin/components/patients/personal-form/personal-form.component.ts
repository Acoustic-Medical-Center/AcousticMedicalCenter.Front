import { Component, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PatientService } from '../../../services/patient.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-personal-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './personal-form.component.html',
  styleUrl: './personal-form.component.scss'
})
export class PersonalFormComponent {

  settingsPersonalForm: FormGroup;

  @Input() patientId!: number | null;

  constructor(
    private fb: FormBuilder,
    private patientService : PatientService,
    private toastr: ToastrService
  ){
    this.settingsPersonalForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.minLength(6)]],
      gender: [''],
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['patientId'] && this.patientId !== null) {
      this.loadPersonalSettings();
    }
  }

  loadPersonalSettings() {
    this.patientService.getUserSettings(this.patientId).subscribe(
      (settings) => {
        console.log('User Settings: ', settings);

        const filteredSettings = {
          firstName: settings.user.firstName || '',
          lastName: settings.user.lastName || '',
          email: settings.user.email || '',
          phoneNumber: settings.user.phoneNumber || '',
          gender: settings.user.gender || '',
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
        const payload = {
          userId: this.patientId,
          ...dirtyValues
        };

        this.patientService.updateUserSettings(payload).subscribe(
          (response) => {
            this.toastr.success('Kullanıcı ayarları başarıyla güncellendi');
            console.log(response);
          },
          (error) => {
            this.toastr.error('Kullanıcı ayarları güncellenirken hata oluştu');
            console.log(error);
          },
        );
      } else {
        this.toastr.warning('Kaydedilecek değişiklik yok.');
      }
    } else {
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
