import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { appRoutes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authFeatureKey, authReducer } from './auth/store/reducer';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import * as authEffects from '../app/auth/store/effects';
import * as flowEffects from '../app/shared/components/flow/store/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { authInterceptor } from './shared/services/authInterceptor';
import {
  flowFeatureKey,
  flowReducer,
} from './shared/components/flow/store/reducers';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore(),
    provideState(authFeatureKey, authReducer),
    provideState(flowFeatureKey, flowReducer),
    provideEffects(authEffects, flowEffects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),

    provideRouterStore(),
  ],
};
