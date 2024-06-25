import { Component } from '@angular/core';
import { DoctorCalendarComponent } from '../../../features/doctors/components/doctor-calendar/doctor-calendar.component';

@Component({
  selector: 'app-my-calendar',
  standalone: true,
  imports: [DoctorCalendarComponent],
  templateUrl: './my-calendar.component.html',
  styleUrl: './my-calendar.component.scss'
})
export class MyCalendarComponent {

}
