import { Component, Input, OnInit } from '@angular/core';
import { AppointmentService } from '../../../services/appointment.service';
import { ToastrService } from 'ngx-toastr';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../../../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [CommonModule, TableComponent, PaginationComponent],
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.scss',
})
export class AppointmentListComponent implements OnInit {
  headers: string[] = [
    'Hasta',
    'Email',
    'Cinsiyet',
    'Tarih',
    'Telefon',
    'Doktor',
  ];
  appointments: any[] = [];
  selectedAppointmentId: any | null = null;
  selectedAppointment: string | null = '';
  currentPage: number = 1;
  pageSize: number = 12;
  totalItems: number = 0;

  @Input() appointmentId: number | null = null;

  constructor(
    private appointmentService: AppointmentService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.getAppointments();
  }

  onPageChange(newPage: number) {
    this.currentPage = newPage;
    console.log('this currentPage', this.currentPage);
    this.getAppointments();
  }

  getAppointments(): void {
    this.appointmentService
      .getAllAppointments(this.currentPage, this.pageSize)
      .subscribe(
        (data: any) => {
          this.appointments = data.items;
          this.totalItems = data.totalCount;
        },
        (error) => {
          console.log('Randevular getirilirken hata oluştu');
        },
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
    const selectedAppointment = this.appointments.find(
      (d) => d.id === appointmentId,
    );
    if (selectedAppointment) {
      this.selectedAppointmentId = appointmentId;
      this.selectedAppointment = `${selectedAppointment.userName} ${selectedAppointment.userLastName}`;
      const modal = document.getElementById(
        'deleteAppointmentModal',
      ) as HTMLDialogElement;
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
        this.toastr.error('Appointment deleted wrong');
      },
    );
  }

  closeModal(): void {
    const modal = document.getElementById(
      'appointmentDetailsModal',
    ) as HTMLDialogElement;
    if (modal) {
      modal.close();
    }
    const deleteModal = document.getElementById(
      'deleteAppointmentModal',
    ) as HTMLDialogElement;
    if (deleteModal) {
      deleteModal.close();
    }
  }
}
