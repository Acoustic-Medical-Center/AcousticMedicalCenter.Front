import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HorizontalCardComponent } from '../../../../shared/components/horizontal-card/horizontal-card.component';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-appointment-table',
  standalone: true,
  imports: [CommonModule, HorizontalCardComponent],
  templateUrl: './appointment-table.component.html',
  styleUrl: './appointment-table.component.scss',
})
export class AppointmentTableComponent {
  appointments: any[] = [];

  constructor(private appointmentService: AppointmentService) {}
  // loadAppointments() {
  //   this.appointmentService.getAllAppointmentsByPatient().subscribe(
  //     (data) => {
  //       this.appointments = data;
  //       console.log('Appointments:', this.appointments);
  //     },
  //     (error) => {
  //       console.error('Error fetching appointments:', error);
  //     },
  //   );
  // }

  loadAppointments() {
    this.appointmentService.getAllAppointmentsByPatient().subscribe({
      next: (data) => this.handleUpdateResponse(data),
      error: (error) => this.handleError(error),
      complete: () => console.log('Observable completed'),
    });
  }

  handleUpdateResponse(data: any) {
    this.appointments = data;
    console.log('Appointments:', this.appointments);
  }

  handleError(error: any) {
    console.error('Error fetching appointments:', error);
  }

  ngOnInit() {
    this.loadAppointments();
  }

  //   {
  //     isim: 'Dr. Hart Hagerty',
  //     ulke: 'United States',
  //     avatarUrl:
  //       'https://img.daisyui.com/tailwind-css-component-profile-2@56w.png',
  //     klinikAdi: 'Zemlak, Daniel and Leannon',
  //     pozisyon: 'Desktop Support Technician',
  //     tarih: '2024-06-01',
  //     randevuDurumu: 'Onaylandı',
  //   },
  //   {
  //     isim: 'Dr. Brice Swyre',
  //     ulke: 'China',
  //     avatarUrl:
  //       'https://img.daisyui.com/tailwind-css-component-profile-3@56w.png',
  //     klinikAdi: 'Carroll Group',
  //     pozisyon: 'Tax Accountant',
  //     tarih: '2024-06-02',
  //     randevuDurumu: 'Beklemede',
  //   },
  //   {
  //     isim: 'Dr. Marjy Ferencz',
  //     ulke: 'Russia',
  //     avatarUrl:
  //       'https://img.daisyui.com/tailwind-css-component-profile-4@56w.png',
  //     klinikAdi: 'Rowe-Schoen',
  //     pozisyon: 'Office Assistant I',
  //     tarih: '2024-06-03',
  //     randevuDurumu: 'İptal Edildi',
  //   },
  //   {
  //     isim: 'Dr. Yancy Tear',
  //     ulke: 'Brazil',
  //     avatarUrl:
  //       'https://img.daisyui.com/tailwind-css-component-profile-5@56w.png',
  //     klinikAdi: 'Wyman-Ledner',
  //     pozisyon: 'Community Outreach Specialist',
  //     tarih: '2024-06-04',
  //     randevuDurumu: 'Onaylandı',
  //   },
  // ];
}
