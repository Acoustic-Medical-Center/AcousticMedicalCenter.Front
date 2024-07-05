import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '../../../core/browser/services/local-storage.service';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class DoctorAppointmentsService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getDoctorAppointments(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/doctor/appointments`);
  }

  submitReport(reportData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/reports`, reportData);
  }
  submitPrescription(prescriptionData: any): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/prescriptions`,
      prescriptionData,
    );
  }

  getAllPastAppointmentsByDoctor(
    page: number,
    pageSize: number,
  ): Observable<any> {
    let params = new HttpParams()
      .set('Page', page)
      .set('PageSize', pageSize)
      .set('DateFilter', 'Prev');
    return this.http.get<any>(`${this.baseUrl}/doctor/appointments`, {
      params,
    });
  }

  getAllUpcomingAppointmentsByDoctor(
    page: number,
    pageSize: number,
  ): Observable<any> {
    let params = new HttpParams()
      .set('Page', page)
      .set('PageSize', pageSize)
      .set('DateFilter', 'Upcoming');
    return this.http.get('https://localhost:7172/api/doctor/appointments', {
      params,
    });
  }

  completeAppointment(appointmentId: string): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/appointmentComplete/${appointmentId}`,
      {},
    );
  }

  cancelAppointment(appointmentId: string): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/appointmentCancel/${appointmentId}`,
      {},
    );
  }
}
