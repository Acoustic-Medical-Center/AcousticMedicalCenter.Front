import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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
  experience: number;
  biography: string;
  doctorInterests: string[];
}
@Injectable({
  providedIn: 'root',
})
export class DoctorSettingsService {
  private baseUrl = 'https://localhost:7172/api/User';
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
  ) {}

  getUserSettings(): Observable<any> {
    return this.http.get<any>(`https://localhost:7172/api/user/settings`);
  }

  getDoctorSettings(): Observable<any> {
    return this.http.get<any>(`https://localhost:7172/api/doctor/settings`);
  }

  updateDoctorSettings(doctorSettings: IDoctor): Observable<any> {
    return this.http.put(
      `https://localhost:7172/api/doctors`,
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
      ${this.baseUrl}`,
      {
        ...userSettings,
      },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
}
