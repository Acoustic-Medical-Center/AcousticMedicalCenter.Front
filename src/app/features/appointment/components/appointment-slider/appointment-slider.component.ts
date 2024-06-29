import { Component, OnInit } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-appointment-slider',
  templateUrl: './appointment-slider.component.html',
  styleUrls: ['./appointment-slider.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule],
})
export class AppointmentSliderComponent implements OnInit {
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;

  clickedElement: Subscription = new Subscription();

  ngOnInit() {
    this.setupDates();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const swiper = this.swiperContainer.nativeElement.swiper;
      const nextEl = swiper.navigation.nextEl;
      const prevEl = swiper.navigation.prevEl;

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
  }

  slides: any[] = [];

  click() {
    console.log('mahmmut');
    console.log(this.slides);
  }

  shiftDates() {
    console.log(this.slides);
  }

  getTimeSlot() {}

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
      this.slides.push({
        date: formattedDate[0],
        day: formattedDate[1],
      });
    }
  }
}
