import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { DoctorPatientsService } from '../../service/doctor-patients.service';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { PatientDetailsModalComponent } from '../patientDetailsModal/patientDetailsModal.component';

@Component({
  selector: 'app-doctors-patients',
  standalone: true,
  imports: [
    CommonModule,
    TableComponent,
    PatientDetailsModalComponent
  ],
  templateUrl: './doctors-patients.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DoctorsPatientsComponent implements OnInit {
  headers: string[] = [
    'Email',
    'Hasta Adı',
    'Telefon Numarası',
  ];
  patients: any[] = [];
  selectedPatientId: any;
  isModalOpen = false;
 
  constructor(private doctorPatientService: DoctorPatientsService,private cdr: ChangeDetectorRef){}

  ngOnInit(): void {
    this.loadPatients();
  }  

  loadPatients(){
    this.doctorPatientService.getDoctorsPatients()
      .subscribe(
        (patients) => {
          this.patients = patients.patients;
          this.cdr.markForCheck(); 
          console.log(patients)
        },
        (error) => {
          console.error('Patients could not be loaded:', error);
        }
      );
  }
  
  showDetails(patientId: string){
    this.selectedPatientId = patientId;
    this.isModalOpen = true;
  }
 

  closeDetailsModal() {
    this.isModalOpen = false;
    // Optionally clear selectedAppointmentId if needed
    // this.selectedAppointmentId = null;
  }
}
