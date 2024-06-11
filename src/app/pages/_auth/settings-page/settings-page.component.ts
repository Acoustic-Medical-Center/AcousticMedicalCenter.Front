import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PatientSettingsService, IUser } from '../../../features/auth/services/patient-settings.service';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss',]
})
export class SettingsPageComponent implements OnInit {
  settingsForm: FormGroup;
  
  userId: string = 'UserId';
  constructor(
    private fb: FormBuilder,
    private settingsService: PatientSettingsService,
  ) {
    this.settingsForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.minLength(6)]],
      gender: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadUserSettings();
  }

  loadUserSettings() {
    this.settingsService.getUserSettings("1").subscribe(settings => {
      this.settingsForm.patchValue(settings);
    });
  }

  onSubmit(): void {
    if (this.settingsForm.valid) {
      this.settingsService.updateUserSettings(this.userId, this.settingsForm.value).subscribe(response => {
        console.log('Settings updated successfully');
      });
    }
  }
}
