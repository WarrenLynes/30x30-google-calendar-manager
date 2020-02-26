import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as calendarEventsActions from './actions';
import { CalendarEvent } from '@calendar/core-data';

export const CALENDAR_EVENTS_FEATURE_KEY = 'calendarEvents';

export interface CalendarEventsState extends EntityState<CalendarEvent> {
  selectedCalendarEventId?: string | number;
  isLoading: boolean;
}

export interface CalendarEventsPartialState {
  readonly [CALENDAR_EVENTS_FEATURE_KEY]: CalendarEventsState;
}

export const calendarEventsAdapter: EntityAdapter<CalendarEvent> = createEntityAdapter<CalendarEvent>();

export const initialState: CalendarEventsState = calendarEventsAdapter.getInitialState({
  selectedCalendarEventId: null,
  isLoading: false
});

const _reducer = createReducer(
  initialState,
  on(calendarEventsActions.calendarEventSelected, (state, { selectedCalendarEventId }) =>
    Object.assign({}, state, { selectedCalendarEventId })
  ),
  on(calendarEventsActions.calendarEventsLoaded, (state, { calendarEvents }) =>
    calendarEventsAdapter.addAll(calendarEvents, { ...state, isLoading: false })
  ),
  on(calendarEventsActions.calendarEventCreated, (state, { calendarEvent }) =>
    calendarEventsAdapter.addOne(calendarEvent, { ...state, isLoading: false })
  ),
  on(calendarEventsActions.calendarEventUpdated, (state, { calendarEvent }) =>
    calendarEventsAdapter.upsertOne(calendarEvent, { ...state, isLoading: false })
  ),
  on(calendarEventsActions.calendarEventDeleted, (state, { calendarEventId }) =>
    calendarEventsAdapter.removeOne(calendarEventId, { ...state, isLoading: false })
  ),
  on(
    calendarEventsActions.loadCalendarEvents,
    calendarEventsActions.createCalendarEvent,
    calendarEventsActions.updateCalendarEvent,
    calendarEventsActions.deleteCalendarEvent,
    (state) => ({
      ...state,
      isLoading: true
    })
  ),
);

export function reducer(state: CalendarEventsState | undefined, action: Action) {
  return _reducer(state, action);
}
