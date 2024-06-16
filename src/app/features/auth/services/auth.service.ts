import { Injectable, afterNextRender } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { LocalStorageService } from '../../../core/browser/services/local-storage.service';
import { IUser } from '../interfaces/IUser';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private router: Router,
  ) {}

  private baseUrl = 'https://localhost:7172/api';

  // private userProfileSubject = new BehaviorSubject<any>(
  //   this.checkUserProfile(),
  // );

  private userTypeSubject = new BehaviorSubject<any>(this.checkUserType());

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/auth/login`, credentials)
      .pipe(tap((response: any) => this.handleAuthentication(response.token)));
  }

  signup(user: IUser): Observable<IUser> {
    console.log('user', user);
    return this.http.post<IUser>(`${this.baseUrl}/auth/register`, user);
  }

  logout(): void {
    this.localStorageService.remove('token');
    this.localStorageService.remove('name');
    this.localStorageService.remove('email');
    this.localStorageService.remove('id');
    this.localStorageService.remove('userType');

    // this.userProfileSubject.next(null);
    this.userTypeSubject.next(null);
    this.router.navigate(['/login']);
  }

  // getUserProfile(): Observable<any> {
  //   console.log(this.userProfileSubject.value);
  //   return this.userProfileSubject.asObservable();
  // }

  getUserType(): Observable<string> {
    console.log(this.userTypeSubject.value);
    return this.userTypeSubject.asObservable();
  }

  handleAuthentication(token: string): void {
    try {
      this.localStorageService.set('token', token);
      const decodedToken: { [key: string]: any } = this.decodeToken();
      const id =
        decodedToken[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
        ];
      const name =
        decodedToken[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
        ];
      const email =
        decodedToken[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
        ];
      const userType = decodedToken['UserType'];

      this.localStorageService.set('name', name);
      this.localStorageService.set('email', email);
      this.localStorageService.set('userType', userType);
      this.localStorageService.set('id', id);
      // this.userProfileSubject.next({ id, name, email, userType });
      this.userTypeSubject.next(userType);

      console.log('userTypeSubject nedir?', this.userTypeSubject.value);
    } catch (error) {
      console.error(error);
    }
  }

  // private checkUserProfile() {
  //   const name = this.localStorageService.get('name');
  //   const email = this.localStorageService.get('email');
  //   const id = this.localStorageService.get('id');
  //   const userType = this.localStorageService.get('userType');

  //   if (name && email && userType && id) {
  //     return { name, email, id, userType };
  //   } else {
  //     return null;
  //   }
  // }

  private checkUserType() {
    return this.localStorageService.get('userType');
  }

  decodeToken(): any {
    const token = localStorage.getItem('token');
    const response = token ? jwtDecode(token) : null;
    return response;
  }
}
