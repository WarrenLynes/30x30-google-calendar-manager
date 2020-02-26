import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { map, tap } from 'rxjs/operators';

import { CalendarEventsFacade } from './facade';
import * as calendarEventsActions from './actions';
import { CalendarEvent, GoogleCalendarService, SnackbarService } from '@calendar/core-data';
import { CalendarEventsPartialState } from './reducer';
import { AppFacade } from '../app/app.facade';

@Injectable()
export class CalendarEventsEffects {
  loadCalendarEvents$ = createEffect(() =>
    this.dataPersistence.fetch(calendarEventsActions.loadCalendarEvents, {
      run: (
        action: ReturnType<typeof calendarEventsActions.loadCalendarEvents>,
        state: CalendarEventsPartialState
      ) => {
        this.appFacade.addLoad('[CALENDAR_EVENTS][LOAD]');
        return this.googleService.all().pipe(
          tap(() => this.notifyService.openSnackBar('Successfully Loaded CalendarEvents')),
          map((calendarEvents: any) => calendarEventsActions.calendarEventsLoaded({ calendarEvents: calendarEvents})),
          tap(() => this.appFacade.removeLoad('[CALENDAR_EVENTS][LOAD]'))
        );
      },
      onError: (action: ReturnType<typeof calendarEventsActions.loadCalendarEvents>, error) => {
        console.log('Effect Error:', error);
      }
    })
  );

  addCalendarEvent$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(calendarEventsActions.createCalendarEvent, {
      run: (
        action: ReturnType<typeof calendarEventsActions.createCalendarEvent>,
        state: CalendarEventsPartialState
      ) => {
        this.appFacade.addLoad('[CALENDAR_EVENTS][CREATE]');

        return this.googleService.create(action.calendarEvent).pipe(
          map((calendarEvent: CalendarEvent) => calendarEventsActions.calendarEventCreated({ calendarEvent })),
          tap(() => this.notifyService.openSnackBar('Successfully Added a CalendarEvent')),
          tap(() => this.appFacade.removeLoad('[CALENDAR_EVENTS][CREATE]'))
        );
      },
      onError: (action: ReturnType<typeof calendarEventsActions.createCalendarEvent>, error) => {
        console.log('Effect Error:', error);
      }
    })
  );

  updateCalendarEvent$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(calendarEventsActions.updateCalendarEvent, {
      run: (
        action: ReturnType<typeof calendarEventsActions.updateCalendarEvent>,
        state: CalendarEventsPartialState
      ) => {
        this.appFacade.addLoad('[CALENDAR_EVENTS][UPDATE]');

        return this.googleService.update(action.calendarEvent).pipe(
          map((calendarEvent: any) => calendarEventsActions.calendarEventUpdated({ calendarEvent: action.calendarEvent })),
          tap(() => this.notifyService.openSnackBar('Successfully Updated a CalendarEvent')),
          tap(() => this.appFacade.removeLoad('[CALENDAR_EVENTS][UPDATE]'))
        );
      },
      onError: (action: ReturnType<typeof calendarEventsActions.updateCalendarEvent>, error) => {
        console.log('Effect Error:', error);
      }
    })
  );

  deleteCalendarEvent$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(calendarEventsActions.deleteCalendarEvent, {
      run: (
        action: ReturnType<typeof calendarEventsActions.deleteCalendarEvent>,
        state: CalendarEventsPartialState
      ) => {
        this.appFacade.addLoad('[CALENDAR_EVENTS][DELETE]');
        return this.googleService.delete(action.calendarEventId).pipe(
          map((calendarEvents: any[]) => calendarEventsActions.calendarEventDeleted({ calendarEventId: action.calendarEventId, calendarEvents })),
          tap(() => this.notifyService.openSnackBar('Successfully Deleted a CalendarEvent')),
          tap(() => this.calendarEventsFacade.loadCalendarEvents()),
          tap(() => this.appFacade.removeLoad('[CALENDAR_EVENTS][DELETE]'))
        );
      },
      onError: (action: ReturnType<typeof calendarEventsActions.deleteCalendarEvent>, error) => {
        console.log('Effect Error:', error);
      }
    })
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<CalendarEventsPartialState>,
    private googleService: GoogleCalendarService,
    private calendarEventsFacade: CalendarEventsFacade,
    private notifyService: SnackbarService,
    private appFacade: AppFacade
  ) {}
}
