import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {RegisterRequestInterface} from '../types/registerRequest.interface';
import {CurrentUserInterface} from '../../shared/types/currentUser.interface';
import {BackendErrorsInterface} from '../../shared/types/backendErrors.interface';
import {loginRequestInterface} from '../types/loginRequest.interface';
import {CurrentUserRequestInterface} from '../../shared/types/currentUserRequestInterface';

export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    Register: props<{ request: RegisterRequestInterface }>(),
    'Register success': props<{ currentUser: CurrentUserInterface }>(),
    'Register failure': props<{ errors: BackendErrorsInterface }>(),
    Login: props<{ request: loginRequestInterface }>(),
    'Login success': props<{ currentUser: CurrentUserInterface }>(),
    'Login failure': props<{ errors: BackendErrorsInterface }>(),
    'Get current User': emptyProps(),
    'Get current User success': props<{ currentUser: CurrentUserInterface }>(),
    'Get current User failure': emptyProps(),
    'Update current User': props<{ currentUserRequest: CurrentUserRequestInterface }>(),
    'Update current User success': props<{ currentUser: CurrentUserInterface }>(),
    'Update current User failure': props<{ errors: BackendErrorsInterface }>(),
    Logout: emptyProps(),
  },
});
