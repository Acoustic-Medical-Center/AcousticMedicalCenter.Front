import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Observable,
  BehaviorSubject,
  tap,
  map,
  delay,
  switchMap,
  of,
} from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CreateAppointmentService {
  private baseUrl = environment.apiUrl;

  private doctorSubject = new BehaviorSubject<any[]>([]);
  doctors$ = this.doctorSubject.asObservable();

  private selectedBranchId = new BehaviorSubject<number | null>(null);
  selectedBranchId$ = this.selectedBranchId.asObservable();

  private selectedDoctorId = new BehaviorSubject<number | null>(null);
  selectedDoctorId$ = this.selectedDoctorId.asObservable();

  private selectedDate = new BehaviorSubject<string>(new Date().toISOString());
  selectedDate$ = this.selectedDate.asObservable();

  // bir doktorun ilgili güne ait appointment listesini tutar.
  private currentDoctorDayAppointmentSource = new BehaviorSubject<any[]>([]);
  currentDoctorDayAppointmentSource$ =
    this.currentDoctorDayAppointmentSource.asObservable();

  constructor(private http: HttpClient) {}

  //Branchleri çek
  getBranches(): Observable<any> {
    return this.http.get(`${this.baseUrl}/DoctorSpecialization`);
  }

  //Branche tıklayınca ilgili doktoru getir.
  setSelectedBranchId(id: number) {
    this.selectedBranchId.next(id);
    this.selectedDoctorId.next(null);
    this.selectedDate.next('');
    this.currentDoctorDayAppointmentSource.next([]);
    this.fetchDoctorsByBranchId(id).subscribe();
  }

  //doktora tıklayınca bugünün tarihi ile ilgili randevuları getirme
  setSelectedDoctorId(id: number) {
    const today = new Date();
    const formattedDate = today.toISOString().slice(0, 10);
    this.selectedDoctorId.next(id);
    // this.fetchAvailableAppointments(id, formattedDate).subscribe();
    this.selectedDate.next(formattedDate);
  }

  //Tarih Gününü ayarla.
  setSelectedDate(date: string) {
    this.selectedDate.next(date + this.selectedDate.value.slice(10));
  }

  //Tarih saatini ayarla
  setSelectedDateTime(time: string) {
    const [hours, minutes] = time.split(':');
    const date = new Date(this.selectedDate.value);
    date.setUTCHours(parseInt(hours, 10), parseInt(minutes, 10));
    this.selectedDate.next(date.toISOString());
  }

  //branch id ye göre doktoru getirme
  fetchDoctorsByBranchId(branchId: number): Observable<any[]> {
    return this.http
      .get<{
        totalCount: number;
        doctors: any[];
      }>(`${this.baseUrl}/doctors?DoctorSpecializationId=${branchId}`)
      .pipe(
        map((response) => response.doctors), // "doctors" anahtarından doktor listesini çıkar
        tap((doctors) => this.doctorSubject.next(doctors)),
        // Çıkarılan listeyi BehaviorSubject'e aktar
      );
  }

  //doktor ve tarihe göre  doktorun randevularını getirme
  fetchAvailableAppointments(doctorId: number, date: string): Observable<any> {
    const params = { DoctorId: doctorId.toString(), Date: date };
    return this.http.get(`${this.baseUrl}/doctor/availableAppointments`, {
      params,
    });
  }

  changeAppointments(appointments: any[]) {
    this.currentDoctorDayAppointmentSource.next(appointments);
  }

  //Randevu oluştur
  createAppointment() {
    const doctorId = this.selectedDoctorId.value;
    const date = this.selectedDate.value;

    if (doctorId && date) {
      const appointment = {
        doctorId: doctorId,
        appointmentTime: date,
      };

      return this.http.post(
        'https://localhost:7172/api/patient/appointments',
        appointment,
      );
    } else {
      console.error('Doctor ID or Date is not set');
      return null;
    }
  }
}
