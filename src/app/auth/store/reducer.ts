import { createFeature, createReducer, on } from '@ngrx/store';
import { register } from './action';
import { AuthStateInterface } from '../types/authState.interface';

const initialState: AuthStateInterface = {
  isSubmitting: false,
};
const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(register, (state) => ({ ...state, isSubmitting: true }))
  ),
});
export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectIsSubmitting,
} = authFeature;
