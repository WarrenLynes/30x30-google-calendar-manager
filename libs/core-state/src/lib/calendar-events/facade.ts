import { Injectable } from '@angular/core';
import { Action, select, Store, ActionsSubject } from '@ngrx/store';
import * as fromCalendarEvents from './reducer';
import * as calendarEventsActions from './actions';
import {
  selectAllCalendarEvents,
  selectCalendarEvent,
  selectCalendarEventsLoading
} from './selectors';
import { CalendarEvent } from '@calendar/core-data';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CalendarEventsFacade {
  allCalendarEvents$ = this.store.pipe(select(selectAllCalendarEvents));
  selectedCalendarEvent$ = this.store.pipe(select(selectCalendarEvent));
  calendarEventLoading$ = this.store.pipe(select(selectCalendarEventsLoading));

  constructor(
    private store: Store<fromCalendarEvents.CalendarEventsPartialState>,
    private actions$: ActionsSubject
  ) {}

  selectCalendarEvent(selectedCalendarEventId: any) {
    this.dispatch(calendarEventsActions.calendarEventSelected({ selectedCalendarEventId }));
  }

  loadCalendarEvents() {
    this.dispatch(calendarEventsActions.loadCalendarEvents());
  }

  createCalendarEvent(calendarEvent: CalendarEvent) {
    this.dispatch(calendarEventsActions.createCalendarEvent({ calendarEvent }));
  }

  updateCalendarEvent(calendarEvent: CalendarEvent) {
    this.dispatch(calendarEventsActions.updateCalendarEvent({ calendarEvent }));
  }

  saveCalendarEvent(calendarEvent: CalendarEvent) {
    if(calendarEvent && calendarEvent.id) {
      this.updateCalendarEvent(calendarEvent);
    } else {
      this.createCalendarEvent(calendarEvent);
    }
    this.selectCalendarEvent(null);
  }

  deleteCalendarEvent(calendarEventId: any) {
    this.dispatch(calendarEventsActions.deleteCalendarEvent({ calendarEventId }));
  }

  private dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
