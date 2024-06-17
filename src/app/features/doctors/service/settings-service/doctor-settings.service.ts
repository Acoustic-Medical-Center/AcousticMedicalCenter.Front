import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../../../../core/browser/services/local-storage.service';

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
}

@Injectable({
  providedIn: 'root'
})
export class DoctorSettingsService {
  private readonly baseUrl = 'https://localhost:7172/api';

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {}

  getUserSettings(userId: string): Observable<any> {
    console.log(`Fetching user settings for ID: ${userId}`);
    return this.http.get<any>(`${this.baseUrl}/user/GetById?UserId=${userId}`);
  }

  updateUserSettings(userId: string, userSettings: IUser): Observable<any> {
    console.log(`Updating user settings for ID: ${userId}`);
    return this.http.put(
      `${this.baseUrl}/user`, 
      {
        id: userId,
        ...userSettings
      }, 
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  getDoctorSettings(doctorId: string): Observable<IDoctor> {
    console.log('Fetching doctor settings for ID:', doctorId);
    return this.http.get<IDoctor>(`${this.baseUrl}/doctors/${doctorId}`);
  }

  updateDoctorSettings(doctorId: string, doctorSettings: IDoctor): Observable<any> {
    console.log(`Updating doctor settings for ID: ${doctorId}`);
    return this.http.put(
      `${this.baseUrl}/doctors/${doctorId}`, 
      {
        id: doctorId,
        ...doctorSettings
      }, 
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
