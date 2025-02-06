import { Route } from '@angular/router';

import { EditArticleService } from './services/editArticle.service';
import { provideEffects } from '@ngrx/effects';
import * as editArticleEffects from './store/effects';
import { provideState } from '@ngrx/store';
import { editArticleFeatureKey, editArticleReducer } from './store/reducers';
import { EditArticleComponent } from './components/edit-article/edit-article.component';

export const routes: Route[] = [
  {
    path: 'edit-article',
    component: EditArticleComponent,
    providers: [
      EditArticleService,
      provideEffects(editArticleEffects),
      provideState(editArticleFeatureKey, editArticleReducer),
    ],
  },
];
