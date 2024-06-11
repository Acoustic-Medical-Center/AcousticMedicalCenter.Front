import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

export interface IUser {

  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
}

@Injectable({
  providedIn: 'root'
})
export class PatientSettingsService {
  private baseUrl = 'https://localhost:7172/api/User'; 
  // https://localhost:7172/api/User/GetById?UserId=1

  constructor(private http: HttpClient) { }

  getUserSettings(UserId: string): Observable<any> {
    return this.http.get<any>(`https://localhost:7172/api/User/GetById?UserId=1`);

  }

  updateUserSettings(UserId: string, userSettings: IUser): Observable<any> {
    return this.http.post(`${this.baseUrl}/Update`, { id: UserId, ...userSettings });
  }
}
