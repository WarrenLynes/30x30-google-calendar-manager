import { Injectable } from '@angular/core';
import { Action, select, Store, ActionsSubject } from '@ngrx/store';
import * as fromCalendars from './reducer';
import * as calendarsActions from './actions';
import {
  selectAllCalendars,
  selectCalendar,
  selectCalendarsLoading
} from './selectors';
import { Calendar } from '@calendar/core-data';

@Injectable({ providedIn: 'root' })
export class CalendarsFacade {
  allCalendars$ = this.store.pipe(select(selectAllCalendars));
  selectedCalendar$ = this.store.pipe(select(selectCalendar));
  calendarLoading$ = this.store.pipe(select(selectCalendarsLoading));

  constructor(
    private store: Store<fromCalendars.CalendarsPartialState>,
    private actions$: ActionsSubject
  ) {}

  selectCalendar(selectedCalendarId: any) {
    this.dispatch(calendarsActions.calendarSelected({ selectedCalendarId }));
  }

  loadCalendars() {
    this.dispatch(calendarsActions.loadCalendars());
  }

  createCalendar(calendar: Calendar) {
    this.dispatch(calendarsActions.createCalendar({ calendar }));
  }

  updateCalendar(calendar: Calendar) {
    this.dispatch(calendarsActions.updateCalendar({ calendar }));
  }

  saveCalendar(calendar: Calendar) {
    if(calendar.id) {
      this.updateCalendar(calendar)
    } else {
      this.createCalendar(calendar);
    }
    this.selectCalendar(null);
  }

  deleteCalendar(calendarId: any) {
    this.dispatch(calendarsActions.deleteCalendar({ calendarId }));
  }

  private dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
