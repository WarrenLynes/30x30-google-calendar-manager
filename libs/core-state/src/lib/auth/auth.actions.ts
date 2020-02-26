import { createAction, props } from '@ngrx/store';

export const authenticate = createAction(
  '[AUTH][AUTHENTICATE][REQUEST]',
  props<{ access_token: any }>()
);

export const authenticateSuccess = createAction(
  '[AUTH][AUTHENTICATE][SUCCESS]',
  props<{ user: any }>()
);
export const authenticateFailure = createAction(
  '[AUTH][AUTHENTICATE][FAILURE]',
  props<{ error: any }>()
);

export const logout = createAction( '[AUTH][LOGOUT]' );
export const logoutFailure = createAction( '[AUTH][LOGOUT][FAILURE]' );
export const logoutSuccess = createAction( '[AUTH][LOGOUT][SUCCESS]' );
export const reset = createAction( '[AUTH][RESET]' );
