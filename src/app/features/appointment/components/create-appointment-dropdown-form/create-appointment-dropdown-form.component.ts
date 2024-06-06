import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-create-appointment-dropdown-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-appointment-dropdown-form.component.html',
  styleUrl: './create-appointment-dropdown-form.component.scss',
})
export class CreateAppointmentDropdownFormComponent {
  now = new Date();
  tomorrow = new Date(this.now);
  selectedDate$ = this.appointmentService.selectedDate$;
  times = [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
  ];

  constructor(private appointmentService: AppointmentService) {
    this.tomorrow.setDate(this.now.getDate() + 1);
  }

  selectTime(date: Date, time: string) {
    const selectedDateTime = new Date(date);
    const [hours, minutes] = time.split(':');
    selectedDateTime.setHours(parseInt(hours, 10) + 3, parseInt(minutes, 10));
    // this.appointmentService.selectDate(selectedDateTime.toLocaleString());
    this.appointmentService.selectDate(selectedDateTime.toISOString());

    console.log(this.appointmentService.selectedDate$);
  }
}
