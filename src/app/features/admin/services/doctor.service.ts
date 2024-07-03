import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { LocalStorageService } from '../../../core/browser/services/local-storage.service';

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  address: string;
}

export interface IDoctor {
  id: number;
  experience: number;
  biography: string;
  doctorInterests: string[];
}
export interface DoctorResponse {
  totalCount: number;
  doctors: IDoctor[];
}


@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private localStorageService : LocalStorageService) {}

  
  getAllDoctors(): Observable<IDoctor[]> {
    return this.http.get<DoctorResponse>(`${this.baseUrl}/doctors`).pipe(
      map(response => response.doctors) 
    );
  }

  getDoctorById(id: number): Observable<IDoctor>{
    return this.http.get<any>(`${this.baseUrl}/doctors/${id}`);
  }
  getUserSettings(id:any):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/user/GetById=${id}`);
  }
  updateDoctorSettings(doctorSettings: IDoctor): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/admin/doctors`,
      {
        ...doctorSettings,
      },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }

  updateUserSettings(userSettings: IUser): Observable<any> {
    console.log('Güncellendi', this.localStorageService.get('Id'));
    return this.http.put(
      `
      ${this.baseUrl}/user`,
      {
        ...userSettings,
      },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
  
 
}
