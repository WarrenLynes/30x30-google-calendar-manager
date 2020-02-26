import { createAction, props } from '@ngrx/store';
import { CalendarEvent } from '@calendar/core-data';

export const open = createAction(
  '[DIALOG][OPEN]',
  props<{ event: CalendarEvent }>()
);

export const submit = createAction( '[DIALOG][CLOSE]', props<{ event: CalendarEvent }>() );
export const cancel = createAction( '[DIALOG][CLOSE]' );
