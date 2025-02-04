import {Actions, createEffect, ofType} from '@ngrx/effects';
import {inject} from '@angular/core';

import {catchError, map, of, switchMap} from 'rxjs';

import {FlowService} from '../services/flow.service';
import {flowActions} from './actions';
import {GetFlowResponseInterface} from '../types/getFlowResponse.interface';

export const getFlowEffect = createEffect(
  (actions$ = inject(Actions), flowService = inject(FlowService)) => {
    return actions$.pipe(
      ofType(flowActions.getFlow),
      switchMap(({url}) => {
        return flowService.getFlow(url).pipe(
          map((flow: GetFlowResponseInterface) => {
            return flowActions.getFlowSuccess({flow});
          }),
          catchError(() => {
            return of(flowActions.getFlowFailure());
          })
        );
      })
    );
  },
  {functional: true}
);
