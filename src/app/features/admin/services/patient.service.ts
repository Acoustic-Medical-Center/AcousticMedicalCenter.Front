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

  getUserSettings(id: any): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/user/GetById?UserId=${id}`);
  }
  updateUserSettings(userSettings: IUser): Observable<any> {
    console.log('Güncellendi', this.localStorageService.get('Id'));
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.put(
      `${this.baseUrl}/admin/user`,
      userSettings,
      { headers, responseType: 'text' }
    );
  }
  //getPatientById
  // deletePatient()
  //updatePatientSettings
 
}
