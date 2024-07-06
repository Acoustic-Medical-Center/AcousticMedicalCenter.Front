import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CreateAppointmentService } from '../../services/create-appointment.service';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-debug-box',
  standalone: true,
  imports: [AsyncPipe, CommonModule],
  templateUrl: './debug-box.component.html',
  styleUrls: ['./debug-box.component.scss'], // Düzeltme: styleUrls olmalı
})
export class DebugBoxComponent implements OnDestroy {
  selectedBranchId: number | null = null;
  private subscription: Subscription;

  constructor(private appointmentService: CreateAppointmentService) {
    // Servisin sunduğu Observable'a abone ol
    this.subscription = this.appointmentService.selectedBranchId$.subscribe(
      (id) => {
        this.selectedBranchId = id;
      },
    );
  }

  appointments$ = this.appointmentService.currentDoctorDayAppointmentSource$;

  selectedBranch$v2 = this.appointmentService.selectedBranchId$;

  selectedDoctorId$ = this.appointmentService.selectedDoctorId$;

  selectedDate = this.appointmentService.selectedDate$;

  resetAll(): void {
    this.appointmentService.resetValues();
  }

  ngOnDestroy(): void {
    console.log('debugbox bu component yok oluyor mu?');
    this.selectedBranchId = 3;
    // Aboneliği yok etmek için
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
