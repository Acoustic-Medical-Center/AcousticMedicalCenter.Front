import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, map } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  private baseUrl = environment.apiUrl;

  private doctorSubject = new BehaviorSubject<any[]>([]);
  doctors$ = this.doctorSubject.asObservable();

  private selectedBranchId = new BehaviorSubject<number | null>(null);
  selectedBranchId$ = this.selectedBranchId.asObservable();

  constructor(private http: HttpClient) {}

  getBranches(): Observable<any> {
    return this.http.get(`${this.baseUrl}/DoctorSpecialization`);
  }

  setSelectedBranchId(id: number) {
    this.selectedBranchId.next(id);
    this.fetchDoctorsByBranchId(id).subscribe();
  }

  // fetchDoctorsByBranchId(branchId: number): Observable<any> {
  //   return this.http
  //     .get<
  //       any[]
  //     >(`https://localhost:7172/api/doctors?DoctorSpecializationId=${branchId}`)
  //     .pipe(tap((doctors) => this.doctorSubject.next(doctors)));
  // }

  fetchDoctorsByBranchId(branchId: number): Observable<any[]> {
    return this.http
      .get<{
        totalCount: number;
        doctors: any[];
      }>(
        `https://localhost:7172/api/doctors?DoctorSpecializationId=${branchId}`,
      )
      .pipe(
        map((response) => response.doctors), // "doctors" anahtarından doktor listesini çıkar
        tap((doctors) => this.doctorSubject.next(doctors)), // Çıkarılan listeyi BehaviorSubject'e aktar
      );
  }
}
