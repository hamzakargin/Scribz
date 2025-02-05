import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ArticleService as SharedArticleService } from '../../shared/services/article.service';
import { inject } from '@angular/core';
import { catchError, map, of, switchMap } from 'rxjs';
import { ArticleInterface } from '../../shared/types/article.interface';
import { articleActions } from './actions';

export const getArticleEffect = createEffect(
  (
    actions$ = inject(Actions),
    ArticleService = inject(SharedArticleService)
  ) => {
    return actions$.pipe(
      ofType(articleActions.getArticle),
      switchMap(({ slug }) => {
        return ArticleService.getArticles(slug).pipe(
          map((article: ArticleInterface) => {
            return articleActions.getArticleSuccess({ article });
          }),
          catchError(() => {
            return of(articleActions.getArticleFailure());
          })
        );
      })
    );
  },
  { functional: true }
);
