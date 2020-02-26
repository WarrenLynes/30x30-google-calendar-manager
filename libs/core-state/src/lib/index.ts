import { ActionReducerMap } from '@ngrx/store';

import { appReducer, IAppState } from './app/app.reducer';
import { authReducer, IAuthState } from './auth/auth.reducer';
import * as fromCalendarEvents from './calendar-events/reducer';
import * as fromCalendars from './calendars/reducer';

export interface AppState {
  app: IAppState;
  auth: IAuthState;
  calendarEvents: fromCalendarEvents.CalendarEventsState;
  calendars: fromCalendars.CalendarsState;
}

export const reducers: ActionReducerMap<AppState> = {
  app: appReducer,
  auth: authReducer,
  calendarEvents: fromCalendarEvents.reducer,
  calendars: fromCalendars.reducer,
};

export const defaultState: AppState = {
  app: null,
  auth: null,
  calendarEvents: {ids: [] } as fromCalendarEvents.CalendarEventsState,
  calendars: {ids: [] } as fromCalendars.CalendarsState,
};
