import { Route } from '@angular/router';
import { CreateArticleComponent } from './components/create-article/create-article.component';
import { CreateArticleService } from './services/createArticle.service';
import { provideEffects } from '@ngrx/effects';
import * as createArticleEffects from './store/effects';
import { provideState } from '@ngrx/store';
import {
  createArticleFeatureKey,
  createArticleReducer,
} from './store/reducers';

export const routes: Route[] = [
  {
    path: 'create-article',
    component: CreateArticleComponent,
    providers: [
      CreateArticleService,
      provideEffects(createArticleEffects),
      provideState(createArticleFeatureKey, createArticleReducer),
    ],
  },
];
