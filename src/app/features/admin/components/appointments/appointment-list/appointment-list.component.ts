import { Component, Input, OnInit } from '@angular/core';
import { AppointmentService } from '../../../services/appointment.service';
import { ToastrService } from 'ngx-toastr';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [CommonModule,TableComponent],
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.scss'
})
export class AppointmentListComponent implements OnInit {
  headers: string[] = [
    'Hasta',
    'Email',
    'Cinsiyet',
    'Tarih',
    'Telefon',
    'Doktor'
  ];
  appointments: any[] = [];
  selectedAppointmentId: any | null = null;
  selectedAppointment: string | null = '';

  @Input() appointmentId: number | null = null;

  constructor(
    private appointmentService: AppointmentService,
    private toastr: ToastrService
  ){}

  ngOnInit(): void {
    this.getAppointments();
  }

  getAppointments(): void {
   this.appointmentService.getAllAppointments().subscribe(
    (data: any[]) => {
      this.appointments = data;
    },
    (error) => {
      console.log('Randevular getirilirken hata oluştu');
    }
   );
  }

  showDetails(appointmentId: number) {
    this.selectedAppointmentId = appointmentId;
    const modal = document.getElementById(
      'appointmentDetailsModal',
    ) as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  }

  confirmDeleteAppointment(appointmentId: number): void {
    // Find the selected doctor
    const selectedAppointment = this.appointments.find(d => d.id === appointmentId);
    if (selectedAppointment) {
      this.selectedAppointmentId = appointmentId;
      this.selectedAppointment = `${selectedAppointment.userName} ${selectedAppointment.userLastName}`;
      const modal = document.getElementById('deleteAppointmentModal') as HTMLDialogElement;
      if (modal) {
        modal.showModal();
      }
    }
  }
  deleteAppointment(appointmentId: number): void {
    this.appointmentService.deleteAppointment(appointmentId).subscribe(
      () => {
        this.toastr.success('Appointment deleted successfully.');
        this.getAppointments();
      },
      (error) => {
       this.toastr.error('Appointment deleted wrong')     
      }
    );
  }

  closeModal(): void {
    const modal = document.getElementById('appointmentDetailsModal') as HTMLDialogElement;
    if (modal) {
      modal.close();
    }
    const deleteModal = document.getElementById('deleteAppointmentModal') as HTMLDialogElement;
    if (deleteModal) {
      deleteModal.close();
    }
  }
}
