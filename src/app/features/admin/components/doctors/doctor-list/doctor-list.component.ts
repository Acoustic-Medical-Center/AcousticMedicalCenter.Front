import { Component, OnInit } from '@angular/core';
import {  DoctorService } from '../../../services/doctor.service';
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
  selectedDoctorId: any;
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

  showDetails(doctorId: number){
    console.log('Doctor ID:', doctorId);  // Bu satırı ekleyin
    this.selectedDoctorId = doctorId;
    this.isDoctorDetailsModal = true;
  }
  closeDoctorDetailsModal() {
    this.isDoctorDetailsModal = false;
  }
}
