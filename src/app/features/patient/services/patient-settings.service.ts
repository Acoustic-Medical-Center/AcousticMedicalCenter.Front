import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
export interface IPatient {
  bloodType: string;
}

@Injectable({
  providedIn: 'root',
})
export class PatientSettingsService {
  private baseUrl = 'https://localhost:7172/api/User';

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
  ) {}

  getUserSettings(): Observable<any> {
    return this.http.get<any>(`https://localhost:7172/api/user/settings`);
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
  getPatientSettings(patientId: string): Observable<IPatient> {
    return this.http.get<IPatient>(
      `https://localhost:7172/api/patient/${patientId}`,
    );
  }

  updatePatientSettings(
    patientId: string,
    patientSettings: IPatient,
  ): Observable<any> {
    console.log(`Updating patient settings for Id: ${patientId}`);
    return this.http.put(
      `https://localhost:7172/api/patients`,
      {
        ...patientSettings,
      },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }

  updateBloodType(bloodType: string): Observable<any> {
    return this.http.put(`https://localhost:7172/api/patient/settings`, {
      bloodType,
    });
  }

  getBloodType(): Observable<any> {
    return this.http.get(`https://localhost:7172/api/patient/settings`);
  }
}
