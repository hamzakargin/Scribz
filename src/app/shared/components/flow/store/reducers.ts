import { createFeature, createReducer, on } from '@ngrx/store';
import { FlowStateInterface } from '../types/flowState.interface';
import { flowActions } from './actions';
import { routerNavigatedAction } from '@ngrx/router-store';

const initialState: FlowStateInterface = {
  isLoading: false,
  error: null,
  data: null,
};
const flowFeature = createFeature({
  name: 'flow',
  reducer: createReducer(
    initialState,
    on(flowActions.getFlow, (state) => ({ ...state, isLoading: true })),
    on(flowActions.getFlowSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action.flow,
    })),
    on(flowActions.getFlowFailure, (state) => ({ ...state, isLoading: false })),
    on(routerNavigatedAction, () => initialState)
  ),
});
export const {
  name: flowFeatureKey,
  reducer: flowReducer,
  selectIsLoading,
  selectError,
  selectData: selectFlowData,
} = flowFeature;
