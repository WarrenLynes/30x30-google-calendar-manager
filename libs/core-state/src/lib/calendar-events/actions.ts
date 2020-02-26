import { createAction, props } from '@ngrx/store';

import { CalendarEvent } from '@calendar/core-data';

export const calendarEventSelected = createAction(
  '[CALENDAR_EVENT][SELECTED]',
  props<{ selectedCalendarEventId: string }>()
);
export const loadCalendarEvents = createAction(
  '[CALENDAR_EVENT][LOAD]'
);
export const calendarEventsLoaded = createAction(
  '[CALENDAR_EVENT][LOADED]',
  props<{ calendarEvents: any[] }>()
);
export const createCalendarEvent = createAction(
  '[CALENDAR_EVENT][CREATE]',
  props<{ calendarEvent: any }>()
);
export const calendarEventCreated = createAction(
  '[CALENDAR_EVENT][CREATED]',
  props<{ calendarEvent: any }>()
);
export const updateCalendarEvent = createAction(
  '[CALENDAR_EVENT][UPDATE]',
  props<{ calendarEvent: any }>()
);
export const calendarEventUpdated = createAction(
  '[CALENDAR_EVENT][UPDATED]',
  props<{ calendarEvent: any }>()
);
export const deleteCalendarEvent = createAction(
  '[CALENDAR_EVENT][DELETE]',
  props<{ calendarEventId: any }>()
);
export const calendarEventDeleted = createAction(
  '[CALENDAR_EVENT][DELETED]',
  props<{ calendarEventId: any, calendarEvents: any[] }>()
);
