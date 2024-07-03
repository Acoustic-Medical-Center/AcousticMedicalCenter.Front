import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from '../../../services/doctor.service';
import { DoctorSettingsFormComponent } from '../doctor-settings-form/doctor-settings-form.component';
import { PersonalFormComponent } from '../personal-form/personal-form.component';

@Component({
  selector: 'app-doctor-edit-form',
  standalone: true,
  imports: [DoctorSettingsFormComponent, PersonalFormComponent],
  templateUrl: './doctor-edit-form.component.html',
  styleUrl: './doctor-edit-form.component.scss',
})
export class DoctorEditFormComponent {
  @Input() doctorId: number | null = null;
}
