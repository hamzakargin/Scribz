import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { FrequentTagsService } from '../services/frequentTags.services';
import { FrequentTagsActions } from './actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { PopularTagType } from '../../../types/popularTag.type';

export const getFrequentTagsEffect = createEffect(
  (
    actions$ = inject(Actions),
    frequentTagsService = inject(FrequentTagsService)
  ) => {
    return actions$.pipe(
      ofType(FrequentTagsActions.getFrequentTags),
      switchMap(() => {
        return frequentTagsService.getFrequentTags().pipe(
          map((popularTags: PopularTagType[]) => {
            return FrequentTagsActions.getFrequentTagsSuccess({
              frequentTags: popularTags,
            });
          }),
          catchError(() => {
            return of(FrequentTagsActions.getFrequentTagsFailure());
          })
        );
      })
    );
  },
  { functional: true }
);
export const {
  name: frequentTagsFeatureKey,
  reducer: frequentTagsReducer,
  selectLoading,
  selectError,
  selectData: selectFrequentTagsData,
} = frequentTagsFeature;
