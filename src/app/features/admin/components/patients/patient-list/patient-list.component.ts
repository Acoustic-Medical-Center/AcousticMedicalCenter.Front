import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TableComponent } from '../../../../../shared/components/table/table.component';
import { IUser, PatientService } from '../../../services/patient.service';
import { ToastrService } from 'ngx-toastr';
import { PatientEditFormComponent } from '../patient-edit-form/patient-edit-form.component';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [CommonModule, TableComponent, PatientEditFormComponent],
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.scss'
})
export class PatientListComponent implements OnInit{
  headers: string[] = [ 'Hasta','Email'];
  patients: any[] = [];
  patient: IUser | undefined;
  selectedPatientId: any | null = null;
  selectedPatientName: string | null=null;

  @Input() patientId: number | null = null;

  constructor(private patientService: PatientService, private toastr: ToastrService) {}
 
  ngOnInit(): void {
   this.getPatients();
  }

  getPatients() {
   this.patientService.getAllPatients().subscribe(
    (data:any[]) => {
      this.patients = data;
    },
    (error) => {
      this.toastr.error('Hastalar getirilirken hata oluştu');
      console.log(error);
    }
   )
  }
  showDetailsPatients(patientId: number) {
    console.log(patientId); 
    this.selectedPatientId = patientId;
    
    const modal = document.getElementById(
      'patientDetailModal',
    ) as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  }

  confirmDeletePatient(patientId: number): void {
    const selectedPatient = this.patients.find(p => p.id === patientId);
    if (selectedPatient) {
      this.selectedPatientId = patientId;
      this.selectedPatientName = `${selectedPatient.firstName} ${selectedPatient.lastName}`;
      const modal = document.getElementById('deletePatientModal') as HTMLDialogElement;
      if (modal) {
        modal.showModal();
      }
    }
  }

  deletePatient(patientId: number): void {
    this.patientService.deletePatient(patientId).subscribe(
      () => {
        this.toastr.success('Patient deleted successfully.');
        this.getPatients();
        
      },
      (error) => {
       this.toastr.error('Patient deleted wrong')   
       console.log(error);  
      }
    );
  }
  closeModal(): void {
    const modal = document.getElementById('patientDetailModal') as HTMLDialogElement;
    if (modal) {
      modal.close();
    }
    const deleteModal = document.getElementById('deletePatientModal') as HTMLDialogElement;
    if (deleteModal) {
      deleteModal.close();
    }
  }

}
