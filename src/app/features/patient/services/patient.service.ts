import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(private http: HttpClient) {}

  baseUrl = environment.apiUrl;

  // getAllPastAppointmentsByPatient(): Observable<any> {
  //   return this.http.get(
  //     `${this.baseUrl}/patient/appointments?DateFilter=Prev`,
  //   );
  // }

  getAllPastAppointmentsByPatient(
    page: number,
    pageSize: number,
  ): Observable<any> {
    let params = new HttpParams()
      .set('Page', page)
      .set('PageSize', pageSize)
      .set('DateFilter', 'Prev');
    return this.http.get<any>(`${this.baseUrl}/patient/appointments`, {
      params,
    });
  }

  getReportByAppointmentId(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/reports/${id}`);
  }

  getAllUpcomingAppointmentsByPatient(): Observable<any> {
    return this.http.get(
      'https://localhost:7172/api/patient/appointments?DateFilter=Upcoming',
    );
  }

  cancelAppointmentById(id: any): Observable<any> {
    console.log('calisti mi ?');
    return this.http.put(`${this.baseUrl}/appointmentCancel/${id}`, {});
  }
}
