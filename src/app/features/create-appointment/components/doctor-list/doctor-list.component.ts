import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CreateAppointmentService } from '../../services/create-appointment.service';
import {
  Observable,
  Subscription,
  catchError,
  first,
  of,
  switchMap,
} from 'rxjs';

@Component({
  selector: 'app-doctor-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doctor-list.component.html',
  styleUrl: './doctor-list.component.scss',
})
export class DoctorListComponent {
  constructor(private createAppointmentService: CreateAppointmentService) {
    this.selectedDate$ = this.createAppointmentService.selectedDate$;
  }
  doctors: any[] = [];
  doctors$ = this.createAppointmentService.doctors$;
  activeDoctorId: number | null = null;
  selectedDate$!: Observable<string>;
  private subscriptions: Subscription = new Subscription();
  date!: string;

  ngOnInit() {
    console.log('doctors nedir', this.doctors$);

    this.subscriptions.add(
      this.selectedDate$.subscribe((date) => {
        this.date = date;
        console.log('date', this.date);
      }),
    );
  }

  onSelectDoctor(doctorId: number) {
    this.activeDoctorId = doctorId;
    this.createAppointmentService.setSelectedDoctorId(doctorId);

    // eğer selected date değeri yoksa bugünün tarihini ata.
    this.createAppointmentService.selectedDate$
      .pipe(
        first(),
        switchMap((date) => {
          if (!date) {
            const newDate = new Date().toISOString().split('T')[0];
            this.createAppointmentService.setSelectedDate(newDate);
            return this.createAppointmentService.selectedDate$.pipe(first());
          }
          return of(date);
        }),
        switchMap((date) =>
          this.createAppointmentService.fetchAvailableAppointments(
            doctorId,
            date,
          ),
        ),
        catchError((error) => {
          console.error('Error fetching appointments:', error);
          return of([]);
        }),
      )
      .subscribe((newAppointments) => {
        this.createAppointmentService.changeAppointments(newAppointments);
        console.log(
          'Appointments for selected doctor loaded:',
          newAppointments,
        );
      });
  }
}
