import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef, Output, EventEmitter, Input, OnChanges, SimpleChanges
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};


@Component({
  selector: 'calendar-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./calendar.component.scss'],
  templateUrl: './calendar.component.html'
})
export class CalendarComponent implements OnChanges {
  viewDate: Date = new Date();
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];
  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [];
  emptyCalendarEvent = {
    start: null,
    end: null,
    title: null,
    color: colors.red,
    actions: this.actions,
    allDay: false,
    resizable: {
      beforeStart: true,
      afterEnd: true
    },
    draggable: true
  };

  @Input() eventList: any;
  @Output() createEventCallback = new EventEmitter();
  @Output() selectEventCallback = new EventEmitter<any>();
  @Output() deleteEventCallback = new EventEmitter<any>();

  constructor(private modal: NgbModal) {}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.eventList && changes.eventList.currentValue) {

      this.events = this.eventList.map((x) => ({
       ...this.emptyCalendarEvent,
        start: new Date(x.start.dateTime),
        end: new Date(x.end.dateTime),
        title: x.summary,
        actions: [
          {
            label: 'x',
            onClick: ({ event }: { event: CalendarEvent }): void => {
              this.deleteEventCallback.emit(event.meta.id);
            }
          }
        ],
        meta: {
         id: x.id
        }
      }));
    }
  }

  createEventAt ({date}) {
    this.createEventCallback.emit(date)
  }

  eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
    console.log(event, newStart, newEnd);
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    console.log(action, event);
    this.selectEventCallback.emit(event.meta.id);
  }
}
