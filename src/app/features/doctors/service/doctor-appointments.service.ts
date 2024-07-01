import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '../../../core/browser/services/local-storage.service';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class DoctorAppointmentsService {

  private baseUrl = environment.apiUrl;
  
  constructor(
    private http: HttpClient,
    
  ) { }

  getDoctorAppointments(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/doctor/appointments`);
  }

  submitReport(reportData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/reports`,reportData);
  }
  submitPrescription(prescriptionData: any): Observable<any>{
    return this.http.post<any>(`https://localhost:7172/prescriptions`,prescriptionData)
  }
}
