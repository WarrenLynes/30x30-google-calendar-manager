import { createAction, props } from '@ngrx/store';

export const calendarSelected = createAction(
  '[CALENDARS][SELECTED]',
  props<{ selectedCalendarId: string }>()
);
export const loadCalendars = createAction(
  '[CALENDARS][LOAD]'
);
export const calendarsLoaded = createAction(
  '[CALENDARS][LOADED]',
  props<{ calendars: any[] }>()
);
export const createCalendar = createAction(
  '[CALENDARS][CREATE]',
  props<{ calendar: any }>()
);
export const calendarCreated = createAction(
  '[CALENDARS][CREATED]',
  props<{ calendar: any }>()
);
export const updateCalendar = createAction(
  '[CALENDARS][UPDATE]',
  props<{ calendar: any }>()
);
export const calendarUpdated = createAction(
  '[CALENDARS][UPDATED]',
  props<{ calendar: any }>()
);
export const deleteCalendar = createAction(
  '[CALENDARS][DELETE]',
  props<{ calendarId: any }>()
);
export const calendarDeleted = createAction(
  '[CALENDARS][DELETED]',
  props<{ calendarId: any, calendars: any[] }>()
);
