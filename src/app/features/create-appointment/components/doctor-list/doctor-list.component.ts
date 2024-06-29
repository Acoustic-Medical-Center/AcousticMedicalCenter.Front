import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CreateAppointmentService } from '../../services/create-appointment.service';
import { Observable, catchError, of } from 'rxjs';

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

  ngOnInit() {
    console.log('doctors nedir', this.doctors$);
  }

  onSelectDoctor(doctorId: number) {
    this.activeDoctorId = doctorId;
    const date = new Date().toISOString().split('T')[0];
    this.createAppointmentService.setSelectedDoctorId(doctorId);

    this.createAppointmentService
      .fetchAvailableAppointments(doctorId, date)
      .pipe(
        catchError((error) => {
          console.error('Error fetching appointments:', error);
          return of([]); // Hata durumunda boş bir array döndürür
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
