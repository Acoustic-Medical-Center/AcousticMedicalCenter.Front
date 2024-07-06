import { Component } from '@angular/core';
import { CreateAppointmentService } from '../../services/create-appointment.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-appointment-button',
  standalone: true,
  imports: [],
  templateUrl: './create-appointment-button.component.html',
  styleUrls: ['./create-appointment-button.component.scss'],
})
export class CreateAppointmentButtonComponent {
  constructor(
    private createAppointmentService: CreateAppointmentService,
    private toastr: ToastrService,
    private router: Router,
  ) {}

  resetAll(): void {
    this.createAppointmentService.resetValues();
  }

  submitAppointment() {
    this.createAppointmentService.createAppointment()?.subscribe({
      next: () => {
        this.toastr.success('Randevu başarıyla oluşturuldu', 'Başarılı');
        this.resetAll();
        this.router.navigate(['/my-appointments']);
      },
      error: (error) => {
        this.toastr.error('Randevu oluşturulurken bir hata oluştu', 'Hata');
        console.error('Error creating appointment', error);
      },
    });
  }
}
