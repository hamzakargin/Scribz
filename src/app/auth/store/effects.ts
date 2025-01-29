import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, of, catchError } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { authActions } from './action';
import { CurrentUserInterface } from '../../shared/types/currentUser.interface';

export const registerEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(authActions.register),
      switchMap(({ request }) => {
        return authService.register(request).pipe(
          map((currentuser: CurrentUserInterface) => {
            return authActions.registerSuccess({ user: currentuser });
          }),
          catchError(() => {
            return of(authActions.registerFailure());
          })
        );
      })
    );
  },
  { functional: true }
);
