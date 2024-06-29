import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { CreateAppointmentService } from '../../services/create-appointment.service';
import { Renderer2 } from '@angular/core';
import Swiper from 'swiper';

@Component({
  standalone: true,
  selector: 'app-date-slider',
  templateUrl: './date-slider.component.html',
  styleUrls: ['./date-slider.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.None,
})
export class DateSliderComponent implements OnInit {
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;

  clickedElement: Subscription = new Subscription();

  selectedDoctorId$!: Observable<number | null>;

  constructor(
    private createAppointmentService: CreateAppointmentService,
    private renderer: Renderer2,
  ) {}

  updateActiveSlide() {
    // Aktif slide'ı güncelle
    const swiper = this.swiperContainer.nativeElement.swiper;
    this.slides.forEach((slide, index) => {
      slide.isActive = index === swiper.activeIndex;
    });
  }

  isActiveSlide(slide: any): boolean {
    return slide.isActive;
  }

  ngOnInit() {
    this.setupDates();
    this.selectedDoctorId$ = this.createAppointmentService.selectedDoctorId$;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const swiper = this.swiperContainer.nativeElement.swiper;
      const nextEl = swiper.navigation.nextEl;
      const prevEl = swiper.navigation.prevEl;
      //next Element
      this.renderer.setStyle(nextEl, 'color', 'black');
      this.renderer.setStyle(nextEl, 'height', '16px');
      this.renderer.setStyle(nextEl, 'top', '37px');

      //prev Element
      this.renderer.setStyle(prevEl, 'color', 'black');
      this.renderer.setStyle(prevEl, 'height', '16px');
      this.renderer.setStyle(prevEl, 'top', '37px');

      if (nextEl) {
        nextEl.addEventListener('click', () => {
          this.shiftDates();
        });
      }

      if (prevEl) {
        prevEl.addEventListener('click', () => {
          this.click();
        });
      }
    }, 0);

    this.updateActiveSlide();
  }

  slides: any[] = [];

  appointments: any[] = [];

  click() {
    console.log('mahmmut');
    console.log(this.slides);
  }

  selectDate(date: string) {
    this.createAppointmentService.setSelectedDate(date);
    const selectedSlideIndex = this.slides.findIndex(
      (slide) => slide.value === date,
    );
    const swiper = this.swiperContainer.nativeElement.swiper;
    swiper.slideTo(selectedSlideIndex);
    this.updateActiveSlide();
  }

  shiftDates() {
    console.log(this.slides);
  }

  getTimeSlot(date: any) {
    this.selectDate(date);
    console.log(this.slides);
    this.selectedDoctorId$.subscribe((doctorId) => {
      if (doctorId) {
        this.createAppointmentService
          .fetchAvailableAppointments(doctorId, date)
          .subscribe((newAppointments) => {
            this.createAppointmentService.changeAppointments(newAppointments);
            console.log('Güne özel randevular', newAppointments);
          });
      } else {
        console.error('No doctor selected');
      }
    });
  }
  setupDates() {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };

    for (let i = 0; i < 15; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const formattedDate = new Intl.DateTimeFormat('tr-TR', options)
        .format(date)
        .split(' ');

      const backendDate = date.toISOString().slice(0, 10);

      this.slides.push({
        date: formattedDate[0],
        day: formattedDate[1],
        value: backendDate,
      });
    }
  }
}
