import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { RegisterRequestInterface } from '../types/registerRequest.interface';
import { CurrentUserInterface } from '../../shared/types/currentUser.interface';

export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    Register: props<{ request: RegisterRequestInterface }>(),
    'Register success': props<{ currentUser: CurrentUserInterface }>(),
    'Register failure': emptyProps(),
  },
});
