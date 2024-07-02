import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

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

  constructor(private http: HttpClient) {}

  
  getAllDoctors(): Observable<IDoctor[]> {
    return this.http.get<DoctorResponse>(`${this.baseUrl}/doctors`).pipe(
      map(response => response.doctors) // response içinden doctors array'ini al
    );
  }

  getDoctorById(id: number): Observable<IDoctor>{
    return this.http.get<any>(`${this.baseUrl}/doctors/${id}`);
  }

  updateDoctorSettings(updatedDoctor: IDoctor): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/admin/doctors/${updatedDoctor.id}`, updatedDoctor);
  }
  
 
}
