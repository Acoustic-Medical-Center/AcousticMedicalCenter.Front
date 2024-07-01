import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-appointment-card',
  standalone: true,
  imports: [DatePipe, CommonModule],
  templateUrl: './appointment-card.component.html',
  styleUrls: ['./appointment-card.component.scss'],
})
export class AppointmentCardComponent implements OnInit {
  @Input() appointment: any;
  @Output() cancelAppointment = new EventEmitter<number>();
  randomImageUrl: string;

  onCancelClick() {
    this.cancelAppointment.emit(this.appointment.id);
  }

  constructor() {
    // Resimlerin yollarını bir dizi içinde tanımlayın
    const imageUrls = [
      'assets/images/doctor1.png',
      'assets/images/doctor2.png',
      'assets/images/doctor3.png',
      'assets/images/doctor4.png',
    ];

    // Rastgele bir resim URL'si seçin
    this.randomImageUrl =
      imageUrls[Math.floor(Math.random() * imageUrls.length)];
  }

  ngOnInit(): void {
    // Varsayılan resim URL'si atanmışsa, onu kullan
    if (!this.appointment.imageUrl) {
      this.appointment.imageUrl = this.randomImageUrl;
    }
  }
}
