import {ApplicationConfig, isDevMode, provideZoneChangeDetection,} from '@angular/core';
import {provideRouter} from '@angular/router';

import {appRoutes} from './app.routes';
import {provideState, provideStore} from '@ngrx/store';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import {authFeatureKey, authReducer} from './auth/store/reducer';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {provideEffects} from '@ngrx/effects';
import * as authEffects from '../app/auth/store/effects';
import * as flowEffects from '../app/shared/components/flow/store/effects';
import * as frequentTagsEffects from '../app/shared/components/frequentTags/store/effects';
import * as addToFavoritesEffect from './shared/components/add-to-favorites/store/effects';
import {authInterceptor} from './shared/services/authInterceptor';
import {flowFeatureKey, flowReducer,} from './shared/components/flow/store/reducers';
import {frequentTagsFeatureKey, frequentTagsReducer,} from './shared/components/frequentTags/store/reducers';
import {AddToFavoritesService} from './shared/components/add-to-favorites/services/addToFavorites.service';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(appRoutes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore(),
    provideState(authFeatureKey, authReducer),
    provideState(flowFeatureKey, flowReducer),
    provideState(frequentTagsFeatureKey, frequentTagsReducer),
    provideEffects(authEffects, flowEffects, frequentTagsEffects, addToFavoritesEffect),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
    AddToFavoritesService
  ],
};
