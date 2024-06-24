import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor(private http: HttpClient) { }

  changePassword(currentPassword: string, newPassword: string): Observable<any> {
    return this.http.put<any>(`https://localhost:7172/api/user/ChangePassword`, { currentPassword, newPassword });
  }
}
