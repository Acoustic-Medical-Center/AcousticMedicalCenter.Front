import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from '../../../core/browser/services/local-storage.service';
import { Observable } from 'rxjs';
export interface IUser {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  address: string;
}
export interface IPatient {
  id: number;
  bloodType: string;
}
@Injectable({
  providedIn: 'root'
})
export class PatientService {

  baseUrl = environment.apiUrl;
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  getAllPatients(): Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}/admin/patients`);
  }

  getPatientById(patientId: string):Observable<IPatient>{
    return this.http.get<any>(`${this.baseUrl}/doctor/patients/${patientId}`);
  }
  getUserSettings(id: any): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/user/GetById?UserId=${id}`);
  }
  updateUserSettings(userSettings: IUser): Observable<any> {

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.put(
      `${this.baseUrl}/admin/user`,
      userSettings,
      { headers, responseType: 'text' }
    );
  }
  updatePatientSettings(patient:IPatient): Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.baseUrl}/admin/patient`,patient,{ headers, responseType: 'json' });
  }
  
  deletePatient(patientId: number):Observable<any>{
    return this.http.delete(`${this.baseUrl}/admin/patients/${patientId}`);
  }
  
 
}
