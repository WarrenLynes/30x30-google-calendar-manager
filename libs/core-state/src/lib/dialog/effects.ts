import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { map, tap } from 'rxjs/operators';

import { CalendarsFacade } from './facade';
import * as calendarsActions from './actions';
import { Calendar, CalendarsService, SnackbarService } from '@calendar/core-data';
import { CalendarsPartialState } from './reducer';
import { AppFacade } from '../app/app.facade';

@Injectable()
export class CalendarsEffects {
  loadCalendars$ = createEffect(() =>
    this.dataPersistence.fetch(calendarsActions.loadCalendars, {
      run: (
        action: ReturnType<typeof calendarsActions.loadCalendars>,
        state: CalendarsPartialState
      ) => {
        this.appFacade.addLoad('[CALENDARS][LOAD]');
        return this.calendarsService.all().pipe(
          tap(() => this.notifyService.openSnackBar('Successfully Loaded Calendars')),
          map((calendars: any) => calendarsActions.calendarsLoaded({ calendars: calendars})),
          tap(() => this.appFacade.removeLoad('[CALENDARS][LOAD]'))
        );
      },
      onError: (action: ReturnType<typeof calendarsActions.loadCalendars>, error) => {
        console.log('Effect Error:', error);
      }
    })
  );

  addCalendar$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(calendarsActions.createCalendar, {
      run: (
        action: ReturnType<typeof calendarsActions.createCalendar>,
        state: CalendarsPartialState
      ) => {
        this.appFacade.addLoad('[CALENDARS][CREATE]');

        return this.calendarsService.create(action.calendar).pipe(
          map((calendar: Calendar) => calendarsActions.calendarCreated({ calendar })),
          tap(() => this.notifyService.openSnackBar('Successfully Added a Calendar')),
          tap(() => this.appFacade.removeLoad('[CALENDARS][CREATE]'))
        );
      },
      onError: (action: ReturnType<typeof calendarsActions.createCalendar>, error) => {
        console.log('Effect Error:', error);
      }
    })
  );

  updateCalendar$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(calendarsActions.updateCalendar, {
      run: (
        action: ReturnType<typeof calendarsActions.updateCalendar>,
        state: CalendarsPartialState
      ) => {
        this.appFacade.addLoad('[CALENDARS][UPDATE]');

        return this.calendarsService.update(action.calendar).pipe(
          map((calendar: any) => calendarsActions.calendarUpdated({ calendar: action.calendar })),
          tap(() => this.notifyService.openSnackBar('Successfully Updated a Calendar')),
          tap(() => this.appFacade.removeLoad('[CALENDARS][UPDATE]'))
        );
      },
      onError: (action: ReturnType<typeof calendarsActions.updateCalendar>, error) => {
        console.log('Effect Error:', error);
      }
    })
  );

  deleteCalendar$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(calendarsActions.deleteCalendar, {
      run: (
        action: ReturnType<typeof calendarsActions.deleteCalendar>,
        state: CalendarsPartialState
      ) => {
        this.appFacade.addLoad('[CALENDARS][DELETE]');
        return this.calendarsService.delete(action.calendarId).pipe(
          map((calendars: any[]) => calendarsActions.calendarDeleted({ calendarId: action.calendarId, calendars })),
          tap(() => this.notifyService.openSnackBar('Successfully Deleted a Calendar')),
          tap(() => this.calendarsFacade.loadCalendars()),
          tap(() => this.appFacade.removeLoad('[CALENDARS][DELETE]'))
        );
      },
      onError: (action: ReturnType<typeof calendarsActions.deleteCalendar>, error) => {
        console.log('Effect Error:', error);
      }
    })
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<CalendarsPartialState>,
    private calendarsService: CalendarsService,
    private calendarsFacade: CalendarsFacade,
    private notifyService: SnackbarService,
    private appFacade: AppFacade
  ) {}
}
