import { Component } from '@angular/core';
import { CreateAppointmentService } from '../../services/create-appointment.service';
@Component({
  selector: 'app-create-appointment-button',
  standalone: true,
  imports: [],
  templateUrl: './create-appointment-button.component.html',
  styleUrls: ['./create-appointment-button.component.scss'],
})
export class CreateAppointmentButtonComponent {
  constructor(private createAppointmentService: CreateAppointmentService) {}

  submitAppointment() {
    this.createAppointmentService.createAppointment()?.subscribe(
      (response) => {
        console.log('Appointment created successfully', response);
      },
      (error) => {
        console.error('Error creating appointment', error);
      },
    );
  }
}
