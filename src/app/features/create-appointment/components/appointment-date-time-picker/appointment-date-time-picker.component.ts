import { Component, OnInit } from '@angular/core';
import { DateSliderComponent } from '../date-slider/date-slider.component';
import { TimeSlotsComponent } from '../time-slots/time-slots.component';
import { Observable, combineLatest, map } from 'rxjs';
import { CreateAppointmentService } from '../../services/create-appointment.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appointment-date-time-picker',
  standalone: true,
  imports: [DateSliderComponent, TimeSlotsComponent, CommonModule],
  templateUrl: './appointment-date-time-picker.component.html',
  styleUrls: ['./appointment-date-time-picker.component.scss'],
})
export class AppointmentDateTimePickerComponent implements OnInit {
  hasSelection$!: Observable<boolean>;
  hasBranchWithoutDoctor$!: Observable<boolean>;

  constructor(private createAppointmentService: CreateAppointmentService) {}

  ngOnInit() {
    const selectedDoctorId$ = this.createAppointmentService.selectedDoctorId$;
    const selectedBranchId$ = this.createAppointmentService.selectedBranchId$;

    this.hasSelection$ = combineLatest([
      selectedDoctorId$,
      selectedBranchId$,
    ]).pipe(map(([doctorId, branchId]) => !!doctorId && !!branchId));

    this.hasBranchWithoutDoctor$ = combineLatest([
      selectedDoctorId$,
      selectedBranchId$,
    ]).pipe(map(([doctorId, branchId]) => !doctorId && !!branchId));
  }
}
