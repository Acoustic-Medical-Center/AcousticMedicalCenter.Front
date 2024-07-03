import { Component, OnInit } from '@angular/core';
import { DoctorService, IDoctor } from '../../../services/doctor.service';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { DoctorEditFormComponent } from '../doctor-edit-form/doctor-edit-form.component';

@Component({
  selector: 'app-doctor-list',
  standalone: true,
  imports: [CommonModule, TableComponent, DoctorEditFormComponent],
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.scss'],
})
export class DoctorListComponent implements OnInit {
  headers: string[] = ['Deneyim', 'Doktor'];
  doctors: any[] = [];
  doctor: IDoctor | undefined;
  selectedDoctorId: any | null = null;

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.getDoctors();
  }

  getDoctors(): void {
    this.doctorService.getAllDoctors().subscribe(
      (data: any[]) => {
        this.doctors = data;
      },
      (error) => {
        console.log('Doktorlar getirilirken hata oluştu.', error);
      },
    );
  }
  showDetails(doctorId: number) {
    this.selectedDoctorId = doctorId;
    const modal = document.getElementById(
      'doctorDetailsModal',
    ) as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  }
}
