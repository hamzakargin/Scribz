import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ArticleInterface } from '../../shared/types/article.interface';

export const articleActions = createActionGroup({
  source: 'article',
  events: {
    'get article': props<{ slug: string }>(),
    'get article success': props<{ article: ArticleInterface }>(),
    'get article failure': emptyProps(),
  },
});
