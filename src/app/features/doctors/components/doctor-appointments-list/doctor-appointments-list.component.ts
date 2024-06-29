import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { DoctorAppointmentsService } from '../../service/doctor-appointments.service';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { ReportFormComponent } from '../report-form/report-form.component';

@Component({
  selector: 'app-doctor-appointments-list',
  standalone: true,
  imports: [
    CommonModule,
    TableComponent,
    ReportFormComponent
  ],
  templateUrl: './doctor-appointments-list.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DoctorAppointmentsListComponent implements OnInit { 
  headers: string[] = [
    'Hasta Adı',
    'Randevu Durumu',
    'Randevu Tarihi',
  ];
  appointments: any[] = [];
  selectedAppointmentId: any;
  constructor(
    private appointmentsService: DoctorAppointmentsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.appointmentsService.getDoctorAppointments().subscribe(
      (data) => {
        this.appointments = data;
        this.cdr.markForCheck(); // Change detection'i tetikliyor
        console.log(data);
      }
    );
  }

  createReport(appointmentId: string) {
    this.selectedAppointmentId = appointmentId;
    const modal = document.getElementById('my_modal_3') as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  }

  
}
