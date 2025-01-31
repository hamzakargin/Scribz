import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { GetFlowResponseInterface } from '../types/getFlowResponse.interface';

export const flowActions = createActionGroup({
  source: 'flow',
  events: {
    'Get flow': props<{ url: string }>(),
    'Get flow success': props<{ flow: GetFlowResponseInterface }>(),
    'Get flow failure': emptyProps,
  },
});
