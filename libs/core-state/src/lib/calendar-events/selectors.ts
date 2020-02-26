import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  CALENDAR_EVENTS_FEATURE_KEY,
  calendarEventsAdapter,
  CalendarEventsState
} from './reducer';
import { emptyCalendarEvent } from '@calendar/core-data';

export const selectCalendarEventsState =
  createFeatureSelector<CalendarEventsState>(CALENDAR_EVENTS_FEATURE_KEY);

const { selectAll, selectEntities } = calendarEventsAdapter.getSelectors();

export const selectCalendarEventsLoading = createSelector(
  selectCalendarEventsState,
  (state: CalendarEventsState) => state.isLoading
);

export const selectAllCalendarEvents = createSelector(
  selectCalendarEventsState,
  (state: CalendarEventsState) => selectAll(state)
);

export const selectCalendarEventsEntities = createSelector(
  selectCalendarEventsState,
  (state: CalendarEventsState) => selectEntities(state)
);

export const selectCalendarEventId = createSelector(
  selectCalendarEventsState,
  (state: CalendarEventsState) => state.selectedCalendarEventId
);

export const selectCalendarEvent = createSelector(
  selectCalendarEventsEntities,
  selectCalendarEventId,
  (entities, selectedId) => {
    return selectedId ? entities[selectedId] : emptyCalendarEvent
  }
);
