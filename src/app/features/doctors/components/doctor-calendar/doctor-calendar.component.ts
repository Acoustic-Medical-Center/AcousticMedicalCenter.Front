import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild, forwardRef } from '@angular/core';
import { Calendar, CalendarOptions, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import interactionPlugin, { DateClickArg, EventDragStopArg } from '@fullcalendar/interaction';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
@Component({
  selector: 'app-doctor-calendar',
  standalone: true,
  imports: [
    CommonModule,
   
    FullCalendarModule
    
  ],
  templateUrl: './doctor-calendar.component.html',
  styleUrls: ['./doctor-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DoctorCalendarComponent implements OnInit {
  
  calendarOptions?: CalendarOptions;
  eventsModel: any;
  @ViewChild('fullcalendar') fullcalendar?: FullCalendarComponent;

  ngOnInit() {
    // need for load calendar bundle first
    forwardRef(() => Calendar);

    this.calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin,resourceTimelinePlugin],
      events: [
        { title: 'event 1', date: '2024-06-24' },
        { title: 'event 2', date: '2024-06-25' }
      ],
      initialView: 'resourceTimeline',
     
      editable: true,
      customButtons: {
        myCustomButton: {
          text: 'custom!',
          click: function () {
            alert('clicked the custom button!');
          }
        }
      },
      headerToolbar: {
        left: 'prev,next today myCustomButton',
        center: 'title',
        right: 'dayGridMonth'
      },
      dateClick: this.handleDateClick.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventDragStop: this.handleEventDragStop.bind(this)
    };
  }

  handleDateClick(arg: DateClickArg) {
    console.log(arg);
  }

  handleEventClick(arg: EventClickArg) {
    console.log(arg);
  }

  handleEventDragStop(arg: EventDragStopArg) {
    console.log(arg);
  }

  updateHeader() {
    this.calendarOptions!.headerToolbar = {
      left: 'prev,next myCustomButton',
      center: 'title',
      right: ''
    };
  }

  updateEvents() {
    const nowDate = new Date();
    const yearMonth = nowDate.getUTCFullYear() + '-' + (nowDate.getUTCMonth() + 1);

    this.calendarOptions!.events = [{
      title: 'Updated Event',
      start: yearMonth + '-08',
      end: yearMonth + '-10'
    }];
  }
}
