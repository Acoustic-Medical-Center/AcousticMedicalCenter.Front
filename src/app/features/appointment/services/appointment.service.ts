import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../auth/services/auth.service';
import { LocalStorageService } from '../../../core/browser/services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  constructor(private http: HttpClient) {}

  private selectedBranchSubject = new BehaviorSubject<string | null>(null);
  selectedBranch$ = this.selectedBranchSubject.asObservable();

  private selectedDoctorSubject = new BehaviorSubject<number | null>(null);
  selectedDoctor$ = this.selectedDoctorSubject.asObservable();

  private selectedDateSubject = new BehaviorSubject<string | null>(null);
  selectedDate$ = this.selectedDateSubject.asObservable();

  selectBranch(branch: string) {
    this.selectedBranchSubject.next(branch);
  }

  selectDoctor(doctor: number) {
    this.selectedDoctorSubject.next(doctor);
  }

  selectDate(date: string) {
    this.selectedDateSubject.next(date);
  }

  createAppointment() {
    const doctorId = this.selectedDoctorSubject.getValue();
    const dateTime = this.selectedDateSubject.getValue();

    if (doctorId && dateTime) {
      const appointmentData = {
        doctorId,
        dateTime,
      };

      return this.http.post(
        'https://localhost:7172/api/Appointment/CreateAppointmentByPatient',
        appointmentData,
      );
    } else {
      return null;
    }
  }

  getAllAppointmentsByPatient(): Observable<any> {
    console.log('=');
    return this.http.get('https://localhost:7172/api/patient/appointments');
  }
}
