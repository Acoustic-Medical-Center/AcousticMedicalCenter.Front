import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CreateAppointmentService } from '../../services/create-appointment.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-time-slots',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './time-slots.component.html',
  styleUrl: './time-slots.component.scss',
})
export class TimeSlotsComponent {
  appointments$!: Observable<any[]>;

  constructor(private createAppointmentService: CreateAppointmentService) {
    this.generateTimeSlots();
  }

  timeSlots: string[] = [];

  takenSlots: string[] = [];

  selectedTimeSlot: string | null = null;

  selectDateTime(date: string) {
    this.createAppointmentService.setSelectedDateTime(date);
    this.selectedTimeSlot = date;
  }

  ngOnInit() {
    this.appointments$ =
      this.createAppointmentService.currentDoctorDayAppointmentSource$;

    // Observable'a abone ol ve her güncellemede konsola yazdır
    this.appointments$.subscribe((appointments) => {
      this.takenSlots = appointments.map((appointment) =>
        this.extractTime(appointment.appointmentTime),
      );
      console.log('Randevular:', this.takenSlots);
      this.selectedTimeSlot = null;
    });

    console.log('time slots', this.timeSlots);
  }

  isActive(slot: string): boolean {
    return this.selectedTimeSlot === slot;
  }

  extractTime(dateTime: string): string {
    return dateTime.split('T')[1].slice(0, 5); // "HH:MM" formatında saat döndür
  }

  isTaken(slot: string): boolean {
    return this.takenSlots.includes(slot);
  }

  generateTimeSlots() {
    console.log('bugün alınmıs randevular', this.appointments$);

    const startTime = new Date();
    startTime.setHours(8, 0, 0, 0); // Sabah 8:00

    const endTime = new Date();
    endTime.setHours(17, 0, 0, 0); // Akşam 17:00

    while (startTime < endTime) {
      this.timeSlots.push(
        startTime.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }),
      );
      startTime.setMinutes(startTime.getMinutes() + 30); // 30 dakika ekle
    }
  }
}
