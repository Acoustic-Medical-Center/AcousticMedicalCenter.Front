import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../../../core/browser/services/local-storage.service';
import { Observable } from 'rxjs';
export interface IAppointment {
  appointmentTime: string;
  status: number;
  bloodType: string;
  patientPhoneNumber: string;
  patientGender: string;
  patientFirstName: string;
  patientLastName: string;
  doctorFirstName: string;
  doctorLastName: string;
  medicationDetails: string | null;
  dosageInstructions: string | null;
  examinationFindings: string | null;
  diagnosis: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  baseURl = environment.apiUrl; 
  constructor(
    private http: HttpClient,
  ) { }

  getAllAppointments(): Observable<any>{
    return this.http.get<any>(`${this.baseURl}/admin/appointments`);
  }
  deleteAppointment(appointmentId: any): Observable<any>{
    return this.http.delete(`${this.baseURl}/admin/appointments/${appointmentId}`);
  }
  
}
