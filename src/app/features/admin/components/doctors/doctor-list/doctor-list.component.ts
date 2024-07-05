import { Component, Input, OnInit } from '@angular/core';
import { DoctorService, IDoctor } from '../../../services/doctor.service';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { DoctorEditFormComponent } from '../doctor-edit-form/doctor-edit-form.component';
import { ToastrService } from 'ngx-toastr';
import { SortPipe } from '../../../sort.pipe';

@Component({
  selector: 'app-doctor-list',
  standalone: true,
  imports: [CommonModule, TableComponent, DoctorEditFormComponent, SortPipe],
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.scss'],
})
export class DoctorListComponent implements OnInit {
  headers: string[] = ['Deneyim', 'Doktor'];
  doctors: any[] = [];
  doctor: IDoctor | undefined;
  selectedDoctorId: any | null = null;
  selectedDoctorName: string | null='';

  @Input() doctorId: number | null = null;

  constructor(private doctorService: DoctorService, private toastr: ToastrService) {}

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
  confirmDeleteDoctor(doctorId: number): void {
    const selectedDoctor = this.doctors.find(d => d.id === doctorId);
    if (selectedDoctor) {
      this.selectedDoctorId = doctorId;
      this.selectedDoctorName = `${selectedDoctor.firstName} ${selectedDoctor.lastName}`;
      const modal = document.getElementById('deleteDoctorModal') as HTMLDialogElement;
      if (modal) {
        modal.showModal();
      }
    }
  }

  deleteDoctor(doctorId: number): void {
    this.doctorService.deleteDoctor(doctorId).subscribe(
      () => {
        this.toastr.success('Doctor deleted successfully.');
        this.getDoctors();
        
      },
      (error) => {
       this.toastr.error('Doctor deleted wrong')     
      }
    );
  }

  closeModal(): void {
    const modal = document.getElementById('doctorDetailsModal') as HTMLDialogElement;
    if (modal) {
      modal.close();
    }
    const deleteModal = document.getElementById('deleteDoctorModal') as HTMLDialogElement;
    if (deleteModal) {
      deleteModal.close();
    }
  }
}
