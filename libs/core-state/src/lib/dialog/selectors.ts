import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  CALENDARS_FEATURE_KEY,
  calendarsAdapter,
  CalendarsState
} from './reducer';
import { emptyCalendar } from '@calendar/core-data';

export const selectCalendarsState =
  createFeatureSelector<CalendarsState>(CALENDARS_FEATURE_KEY);

const { selectAll, selectEntities } = calendarsAdapter.getSelectors();

export const selectCalendarsLoading = createSelector(
  selectCalendarsState,
  (state: CalendarsState) => state.isLoading
);

export const selectAllCalendars = createSelector(
  selectCalendarsState,
  (state: CalendarsState) => selectAll(state)
);

export const selectCalendarsEntities = createSelector(
  selectCalendarsState,
  (state: CalendarsState) => selectEntities(state)
);

export const selectCalendarId = createSelector(
  selectCalendarsState,
  (state: CalendarsState) => state.selectedCalendarId
);

export const selectCalendar = createSelector(
  selectCalendarsEntities,
  selectCalendarId,
  (entities, selectedId) => {
    return selectedId ? entities[selectedId] : emptyCalendar
  }
);
