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
import { PatientSettingsFormComponent } from '../../../features/patient/components/patient-settings-form/patient-settings-form.component';
import { PatientGeneralSettingsFormComponent } from '../../../features/patient/components/patient-general-settings-form/patient-general-settings-form.component';
@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [
    CommonModule,
    PatientSettingsFormComponent,
    PatientGeneralSettingsFormComponent
  ],
  templateUrl: './patient-settings.component.html',
  styleUrls: ['./patient-settings.component.scss'],
})
export class PatientSettingsComponent {
  currentTab: string = 'generalPatient';
}
