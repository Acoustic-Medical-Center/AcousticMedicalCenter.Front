import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild, forwardRef } from '@angular/core';
import { Calendar, CalendarOptions, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg, EventDragStopArg } from '@fullcalendar/interaction';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-doctor-calendar',
  standalone: true,
  imports: [
    CommonModule,
    FullCalendarModule
  ],
  templateUrl: './doctor-calendar.component.html',
  styles: `
    #updateHeader, #updateEvents, #deleteEvent, #toggleTimelineView {
      border: 2px solid black;
      background-color: black;
      color: white;
      margin: 5px;
      padding: 5px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DoctorCalendarComponent implements OnInit {
  calendarOptions?: CalendarOptions;
  eventsModel: any;
  constructor(private toastr: ToastrService){}

  @ViewChild('fullcalendar') fullcalendar?: FullCalendarComponent;

  ngOnInit() {
    forwardRef(() => Calendar);

    this.calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin, resourceTimelinePlugin],
      initialView: 'resourceTimelineDay',
      resources: [
        { id: 'a', title: 'Room A' },
        { id: 'b', title: 'Room B' },
        { id: 'c', title: 'Room C' }
      ],
      events: [
        { id: '1', resourceId: 'a', title: 'event 1', start: '2024-06-24T10:00:00', end: '2024-06-24T12:00:00' },
        { id: '2', resourceId: 'b', title: 'event 2', start: '2024-06-25T14:00:00', end: '2024-06-25T16:00:00' }
      ],
      editable: true,
      customButtons: {
        addEventButton: {
          text: 'add event...',
          click: this.addEvent.bind(this)
        },
        toggleTimelineViewButton: {
          text: 'Toggle Timeline View',
          click: this.toggleTimelineView.bind(this)
        }
      },
      headerToolbar: {
        left: 'prev,next today addEventButton toggleTimelineViewButton',
        center: 'title',
        right: 'dayGridMonth,dayGridWeek,resourceTimeline'
      },
      dateClick: this.handleDateClick.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventDragStop: this.handleEventDragStop.bind(this)
    };
  }

  addEvent() {
    const dateStr = prompt('Enter a date in YYYY-MM-DD format') || undefined;
    const startTimeStr = prompt('Enter a start time in HH:MM format') || undefined;
    const endTimeStr = prompt('Enter an end time in HH:MM format') || undefined;
    const resourceId = prompt('Enter the resource ID (e.g., a, b, c)') || undefined;

    if (!dateStr || !startTimeStr || !endTimeStr || !resourceId) {
      this.toastr.error('Geçersiz tarih, saat, veya kaynak');
      return;
    }

    const startDateTime = new Date(`${dateStr}T${startTimeStr}:00`);
    const endDateTime = new Date(`${dateStr}T${endTimeStr}:00`);

    if (!isNaN(startDateTime.valueOf()) && !isNaN(endDateTime.valueOf())) {
      this.fullcalendar?.getApi().addEvent({
        id: String(Date.now()), // Unique ID for the event
        title: 'dynamic event',
        start: startDateTime,
        end: endDateTime,
        resourceId: resourceId
      });
      this.toastr.success('Event Eklendi..');
    } else {
      this.toastr.warning('Geçersiz tarih veya saat');
    }
  }

  updateEvents() {
    const calendarApi = this.fullcalendar?.getApi();
    if (!calendarApi) return;

    const dateStr = prompt('Güncellemek istediğiniz etkinliğin tarihini YYYY-MM-DD formatında girin') || undefined;
    if (!dateStr) {
      this.toastr.error('Geçersiz tarih.');
      return;
    }

    const date = new Date(`${dateStr}T00:00:00`);
    if (isNaN(date.valueOf())) {
      this.toastr.error('Geçersiz tarih.');
      return;
    }

    const events = calendarApi.getEvents().filter(event => {
      const eventDate = new Date(event.startStr);
      return eventDate.toDateString() === date.toDateString();
    });

    if (events.length > 0) {
      const newTitle = prompt('Yeni başlık girin:', events[0].title) || undefined;
      if (newTitle) {
        events.forEach(event => event.setProp('title', newTitle));
        this.toastr.success('Etkinlik(ler) güncellendi.');
      }
    } else {
      this.toastr.error('Belirtilen tarih ile bir etkinlik bulunamadı.');
    }
  }

  deleteEvent() {
    const calendarApi = this.fullcalendar?.getApi();
    if (!calendarApi) return;

    const dateStr = prompt('Silmek istediğiniz etkinliğin tarihini YYYY-MM-DD formatında girin') || undefined;
    if (!dateStr) {
      this.toastr.error('Geçersiz tarih.');
      return;
    }

    const date = new Date(`${dateStr}T00:00:00`);
    if (isNaN(date.valueOf())) {
      this.toastr.error('Geçersiz tarih.');
      return;
    }

    const events = calendarApi.getEvents().filter(event => {
      const eventDate = new Date(event.startStr);
      return eventDate.toDateString() === date.toDateString();
    });

    if (events.length > 0) {
      events.forEach(event => event.remove());
      this.toastr.success('Etkinlik(ler) silindi.');
    } else {
      this.toastr.error('Belirtilen tarih ile bir etkinlik bulunamadı.');
    }
  }

  toggleTimelineView() {
    const calendarApi = this.fullcalendar?.getApi();
    if (!calendarApi) return;

    if (calendarApi.view.type === 'resourceTimeline') {
      calendarApi.changeView('dayGridMonth');
    } else {
      calendarApi.changeView('resourceTimeline');
    }
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
}
