import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { PopularTagType } from '../../../types/popularTag.type';

export const FrequentTagsActions = createActionGroup({
  source: 'frequent Tags',
  events: {
    'Get frequent tags': emptyProps(),
    'Get frequent tags success': props<{ frequentTags: PopularTagType[] }>(),
    'Get frequent tags failure': emptyProps(),
  },
});
