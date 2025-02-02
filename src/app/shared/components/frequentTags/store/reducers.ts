import { createFeature, createReducer, on } from '@ngrx/store';
import { FrequentTagsState } from '../types/frequentTagsState.interface';
import { FrequentTagsActions } from './actions';

const initailState: FrequentTagsState = {
  data: null,
  isLoading: false,
  error: null,
};
const frequentTagsFeauture = createFeature({
  name: 'frequentTags',
  reducer: createReducer(
    initailState,
    on(FrequentTagsActions.getFrequentTags, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(FrequentTagsActions.getFrequentTagsSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action.frequentTags,
    })),
    on(FrequentTagsActions.getFrequentTagsFailure, (state) => ({
      ...state,
      isLoading: false,
    }))
  ),
});
