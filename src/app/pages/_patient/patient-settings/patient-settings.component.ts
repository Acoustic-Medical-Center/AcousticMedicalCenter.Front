import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  PatientSettingsService,
  IUser,
} from '../../../features/patient/services/settings-service/patient-settings.service';
import { LocalStorageService } from '../../../core/browser/services/local-storage.service';
@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './patient-settings.component.html',
  styleUrls: ['./patient-settings.component.scss'],
})
export class PatientSettingsComponent implements OnInit {
  settingsForm: FormGroup;

  userId: string | null = '';
  constructor(
    private fb: FormBuilder,
    private settingsService: PatientSettingsService,
    private LocalStorageService : LocalStorageService
  ) {
    this.settingsForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.minLength(6)]],
      gender: [''],
      
    });
  }

  ngOnInit(): void {
    this.userId = this.LocalStorageService.get<string>('Id');
    console.log('Fetched userIdd from LocalStorage', this.userId);


    if (this.userId) {
      this.loadUserSettings(this.userId);
    }else{
      console.log("User id bulunamadı");
    }
    
  }

  loadUserSettings(userId:string) {
    
    this.settingsService.getUserSettings(userId).subscribe(
      (settings) => {
        const filteredSettings = {
          firstName: settings.user.firstName,
          lastName: settings.user.lastName,
          email: settings.user.email,
          phoneNumber: settings.user.phoneNumber,
          gender: settings.gender,
          addres: settings.address
        };

        this.settingsForm.patchValue(filteredSettings);
        console.log('Filtered Settings:', settings); 
        console.log('settingsFormValue', this.settingsForm.value);
      },
      (error) => {
        console.error('Error fetching user settings:', error); 
      },
    );
    
    
  }

  onSubmit(): void {
    if (this.settingsForm.valid && this.userId) {
      this.settingsService
        .updateUserSettings(this.userId, this.settingsForm.value)
        .subscribe((response) => {
          console.log('Settings updated successfully', response);
        });
    }else{
      console.error("Form geçersiz");
    }
  }
}
