import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'register',
    loadChildren: () =>
      import('./auth/auth.routes').then((m) => m.registerRoutes),
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.loginRoutes),
  },
  {
    path: '',
    loadChildren: () =>
      import('./publicFlow/publicFlow.routes').then((m) => m.routes),
  },
  {
    path: 'flow',
    loadChildren: () =>
      import('./yourFlow/yourFlow.routes').then((m) => m.routes),
  },
  {
    path: 'tags/:slug',
    loadChildren: () =>
      import('./tagFlow/tagFlow.routes').then((m) => m.routes),
  },
];
