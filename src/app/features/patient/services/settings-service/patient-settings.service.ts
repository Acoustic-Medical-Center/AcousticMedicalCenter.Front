import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { LocalStorageService } from '../../../../core/browser/services/local-storage.service';

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  address: string;
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

  getUserSettings(UserId: string): Observable<any> {
    console.log('id nedir', this.localStorageService.get('Id'));
    console.log('girdi mi buraya?');
    return this.http.get<any>(
      `https://localhost:7172/api/User/GetById?UserId=${UserId}`,
    );
  }

  updateUserSettings(UserId: string, userSettings: IUser): Observable<any> {
    console.log("Güncellendi", this.localStorageService.get('Id'));
    return this.http.post(`${this.baseUrl}/Update`, {
      id: UserId,
      ...userSettings,
    });
   
  }
  getPatientSettings(UserId: string): Observable<any> {
    return this.http.get<any>(
      `https://localhost:7172/api/User/GetById?UserId=${UserId}`,
    );
  }

  updatePatientSettings(UserId: string, userSettings: IUser): Observable<any> {
    console.log("Güncellendi", this.localStorageService.get('Id'));
    return this.http.post(`${this.baseUrl}/Update`, {
      id: UserId,
      ...userSettings,
    });
   
  }
}
