import { Component, OnInit } from '@angular/core';
import {  DoctorService, IDoctor } from '../../../services/doctor.service';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { DoctorEditFormComponent } from '../doctor-edit-form/doctor-edit-form.component';


@Component({
  selector: 'app-doctor-list',
  standalone: true,
  imports: [
    CommonModule,
    TableComponent,
    DoctorEditFormComponent
  ],
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.scss']
})
export class DoctorListComponent implements OnInit {
  headers: string[] = [
    'Deneyim',
    'Doktor',
  ];
  doctors: any[] = [];
  doctor: IDoctor | undefined;
  selectedDoctorId: any | null = null;
  isDoctorDetailsModal = false;
  

  constructor(private doctorService: DoctorService ) {}

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
      }
    );
  }
 
  showDetails(doctorId: number): void {
  
    this.doctorService.getDoctorById(doctorId).subscribe(
      (doctor: IDoctor) => {
        this.selectedDoctorId = doctor;
        this.isDoctorDetailsModal = true;
      },
      (error) => {
        console.log('Doktor detayları getirilirken hata oluştu.', error);
      }
    );
  }
  closeDoctorDetailsModal() {
    this.isDoctorDetailsModal = false;
  }
}
