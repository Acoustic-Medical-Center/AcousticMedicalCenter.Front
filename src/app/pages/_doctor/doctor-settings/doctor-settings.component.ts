import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DoctorSettingsFormComponent } from '../../../features/doctors/components/doctor-settings-form/doctor-settings-form.component';
import { DoctorGeneralSettingsComponent } from '../../../features/doctors/components/doctor-general-settings/doctor-general-settings.component';


@Component({
    selector: 'app-doctor-settings',
    standalone: true,
    templateUrl: './doctor-settings.component.html',
    styleUrls: ['./doctor-settings.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
      CommonModule,
      DoctorSettingsFormComponent,
      DoctorGeneralSettingsComponent
    ]
})
export class DoctorSettingsComponent  {
  currentTab: string = 'general';
}
