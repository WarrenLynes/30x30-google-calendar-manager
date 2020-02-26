import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Calendar, CalendarEvent, emptyCalendarEvent } from '@calendar/core-data';
import { CalendarEventsFacade, CalendarsFacade } from '@calendar/core-state';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { CalendarEventFormComponent } from '@calendar/ui';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'calendar-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject();
  calendars$: Observable<Calendar[]> = this.calendarsFacade.allCalendars$;
  events$: Observable<CalendarEvent[]> = this.calendarEventFacade.allCalendarEvents$;
  event$: Observable<CalendarEvent> = this.calendarEventFacade.selectedCalendarEvent$;

  constructor(
    private calendarsFacade: CalendarsFacade,
    private calendarEventFacade: CalendarEventsFacade,
    private dialog: MatDialog
  ) { }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnInit() {
    this.calendarsFacade.loadCalendars();
    this.calendarEventFacade.loadCalendarEvents();

    this.calendarEventFacade.selectedCalendarEvent$.pipe(
      takeUntil(this.destroy$),
      filter(x => !!x && !!x.id),

      tap((x) => { console.log(x); })

    ).subscribe((x) => this.openDialog(x));
  }

  onSelectCalendarEvent(calendarEventId: any) {
    this.calendarEventFacade.selectCalendarEvent(calendarEventId);
  }

  onCreateEvent(date) {
    this.openDialog(emptyCalendarEvent);
  }

  saveCalendarEvent(calendarEvent: CalendarEvent) {
    this.calendarEventFacade.saveCalendarEvent(calendarEvent);
  }

  onDeleteCalendarEvent(calendarEventId:any) {
    this.calendarEventFacade.deleteCalendarEvent(calendarEventId)
  }

  openDialog(calendarEvent): void {
    const dialogRef = this.dialog.open(CalendarEventFormComponent, {
      // width: '250px',
      data: calendarEvent
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.saveCalendarEvent(result);
    });
  }
}
