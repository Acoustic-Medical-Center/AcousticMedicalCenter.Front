import { Injectable, afterNextRender } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { LocalStorageService } from '../../../core/browser/services/local-storage.service';

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'https://localhost:7172/api';
  private isLoggedInSubject = new BehaviorSubject<boolean>(
    this.checkTokenPresence(),
  );
  private userProfileSubject = new BehaviorSubject<any>(
    this.checkUserProfile(),
  );

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
  ) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/Auth/Login`, credentials)
      .pipe(tap((response: any) => this.handleAuthentication(response.token)));
  }

  signup(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${this.baseUrl}/Auth/Register`, user);
  }

  logout(): void {
    this.localStorageService.remove('token');
    this.localStorageService.remove('name');
    this.localStorageService.remove('email');

    // localStorage.removeItem('token');
    // localStorage.removeItem('name');
    // localStorage.removeItem('email');

    this.isLoggedInSubject.next(false);
    this.userProfileSubject.next(null);
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  getUserProfile(): Observable<any> {
    //mantık hatası var tokenı olmayan adamdan token isteyen fonksiyon mu olur mk

    return this.userProfileSubject.asObservable();
  }

  handleAuthentication(token: string): void {
    // localStorage.setItem('token', token);
    this.localStorageService.set('token', token);
    const decodedToken: { [key: string]: any } = this.decodeToken();
    console.log('getUserProfile Token', decodedToken);
    const name =
      decodedToken[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
      ];
    const email =
      decodedToken[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
      ];

    const userType = decodedToken['UserType'];

    console.log('name: ' + name);
    console.log('email: ' + email);
    console.log('userType: ' + userType);

    // localStorage.setItem('name', name);
    // localStorage.setItem('email', email);

    this.localStorageService.set('name', name);
    this.localStorageService.set('email', email);
    this.localStorageService.set('userType', userType);

    this.userProfileSubject.next({ name, email });
    console.log('userProfileSujbject nedir?', this.userProfileSubject);

    this.isLoggedInSubject.next(true);
  }

  // checkTokenPresence(): any {
  //SSR varken local storage is undefined hatası çözüyor ama bu yaklaşım doru mu ?
  //   afterNextRender(() => {
  //     console.log('checkTokenPresence', !!localStorage.getItem('token'));
  //     console.log(this.isLoggedInSubject);
  //     return !!localStorage.getItem('token');
  //   });
  // }

  checkTokenPresence(): any {
    // return !!localStorage.getItem('token');

    return !!this.localStorageService.get('token');
  }

  private checkUserProfile() {
    // const name = localStorage.getItem('name');
    // const email = localStorage.getItem('email');

    const name = this.localStorageService.get('name');
    const email = this.localStorageService.get('email');

    if (name && email) {
      return { name, email };
    } else {
      return null;
    }
  }

  decodeToken(): any {
    const token = localStorage.getItem('token');

    // const token = String(this.localStorageService.get('token'));
    return token ? jwtDecode(token) : null;
  }
}
