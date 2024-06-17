import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DoctorSettingsService } from '../../service/settings-service/doctor-settings.service';
import { LocalStorageService } from '../../../../core/browser/services/local-storage.service';

@Component({
  selector: 'app-doctor-general-settings',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './doctor-general-settings.component.html',
  styleUrls: ['./doctor-general-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DoctorGeneralSettingsComponent implements OnInit { 
  settingsGeneralDoctorForm: FormGroup;
  userId: string | null = '';

  constructor(
    private fb: FormBuilder,
    private settingsService: DoctorSettingsService,
    private localStorageService: LocalStorageService // Düzeltildi
  ){
    this.settingsGeneralDoctorForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.minLength(6)]],
      gender: [''],
      address: ['']
    });
  }

  ngOnInit(): void {
    this.userId = this.localStorageService.get<string>('Id');
    if (this.userId) {
      console.log(`User id bulundu: ${this.userId}`);
      this.loadDoctorGeneralSettings(this.userId);
    } else {
      console.log("User id bulunamadı");
    }
  }

  loadDoctorGeneralSettings(userId: string) {
    console.log('Fetching user settings for ID:', userId);
    this.settingsService.getUserSettings(userId).subscribe(
      (settings) => {
        console.log('User Settings:', settings);
        
        const filteredSettings = {
          firstName: settings.user?.firstName || '',
          lastName: settings.user?.lastName || '',
          email: settings.user?.email || '',
          phoneNumber: settings.user?.phoneNumber || '',
          gender: settings.user?.gender || '',
          address: settings.user?.address || ''
        };
        this.settingsGeneralDoctorForm.patchValue(filteredSettings);
        console.log('settingsFormValue after user settings:', this.settingsGeneralDoctorForm.value);
      },
      (error) => {
        console.error('Error fetching user settings:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.settingsGeneralDoctorForm.valid && this.userId) {
      this.settingsService
        .updateUserSettings(this.userId, this.settingsGeneralDoctorForm.value)
        .subscribe((response) => {
          console.log("User settings updated successfully", response);
        }, (error) => {
          console.error('Error updating user settings:', error);
        });
    } else {
      console.log("Form geçersiz");
    }
  }
}
