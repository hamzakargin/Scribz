import {SettingsStateInterface} from '../types/settingsState.interface';
import {createFeature, createReducer, on} from '@ngrx/store';
import {authActions} from '../../auth/store/action';
import {routerNavigationAction} from '@ngrx/router-store';


const initialState: SettingsStateInterface = {
  isSubmitting: false,
  validationErrors: null,
}
const settingFeature = createFeature({
  name: 'settings',
  reducer: createReducer(
    initialState,
    on(authActions.updateCurrentUser, (state) => ({
      ...state, isSubmitting: true,
    })),
    on(authActions.updateCurrentUserSuccess, (state) => ({
      ...state, isSubmitting: false,
    })),
    on(authActions.updateCurrentUserFailure, (state) => ({
      ...state, isSubmitting: false,
    })),
    on(routerNavigationAction, () => initialState)
  ),
})
export const {
  name: settingsFeatureKey,
  reducer: settingsReducer,
  selectValidationErrors,
  selectIsSubmitting,
} = settingFeature;


