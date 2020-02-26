import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as calendarsActions from './actions';
import { Calendar } from '@calendar/core-data';

export const CALENDARS_FEATURE_KEY = 'calendars';

export interface CalendarsState extends EntityState<Calendar> {
  selectedCalendarId?: string | number;
  isLoading: boolean;
}

export interface CalendarsPartialState {
  readonly [CALENDARS_FEATURE_KEY]: CalendarsState;
}

export const calendarsAdapter: EntityAdapter<Calendar> = createEntityAdapter<Calendar>();

export const initialState: CalendarsState = calendarsAdapter.getInitialState({
  selectedCalendarId: null,
  isLoading: false
});

const _reducer = createReducer(
  initialState,
  on(calendarsActions.calendarSelected, (state, { selectedCalendarId }) =>
    Object.assign({}, state, { selectedCalendarId })
  ),
  on(calendarsActions.calendarsLoaded, (state, { calendars }) =>
    calendarsAdapter.addAll(calendars, { ...state, isLoading: false })
  ),
  on(calendarsActions.calendarCreated, (state, { calendar }) =>
    calendarsAdapter.addOne(calendar, { ...state, isLoading: false })
  ),
  on(calendarsActions.calendarUpdated, (state, { calendar }) =>
    calendarsAdapter.upsertOne(calendar, { ...state, isLoading: false })
  ),
  on(calendarsActions.calendarDeleted, (state, { calendarId }) =>
    calendarsAdapter.removeOne(calendarId, { ...state, isLoading: false })
  ),
  on(
    calendarsActions.loadCalendars,
    calendarsActions.createCalendar,
    calendarsActions.updateCalendar,
    calendarsActions.deleteCalendar,
    (state) => ({
      ...state,
      isLoading: true
    })
  ),
);

export function reducer(state: CalendarsState | undefined, action: Action) {
  return _reducer(state, action);
}
