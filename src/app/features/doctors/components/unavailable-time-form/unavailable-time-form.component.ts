import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-unavailable-time-form',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './unavailable-time-form.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnavailableTimeFormComponent {
  events = [
    { title: 'event 1', date: '2024-06-24' },
    { title: 'event 2', date: '2024-06-25' }
  ];

  addEvent() {
    // Yeni bir event eklemek için
    const newEvent = { title: 'Yeni Event', date: '2024-06-26' };
    this.events.push(newEvent);
  }

}
