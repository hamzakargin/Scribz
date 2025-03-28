import {Route} from '@angular/router';

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
    path: 'feed',
    loadChildren: () =>
      import('./yourFlow/yourFlow.routes').then((m) => m.routes),
  },
  {
    path: 'tags/:slug',
    loadChildren: () =>
      import('./tagFlow/tagFlow.routes').then((m) => m.routes),
  },
  {
    path: 'article/new',
    loadChildren: () =>
      import('./createPost/createArticle.routes').then((m) => m.routes),
  },
  {
    path: 'article/:slug',
    loadChildren: () =>
      import('./publication/article.routes').then((m) => m.routes),
  },
  {
    path: 'article/:slug/edit',
    loadChildren: () =>
      import('./editPost/editArticle.routes').then((m) => m.routes),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./settings/settings.routes').then((m) => m.routes),
  },
  {
    path: 'profiles/:slug',
    loadChildren: () =>
      import('./userProfile/userProfile.routes').then((m) => m.roues),
  },
  {
    path: 'profiles/:slug/favorites',
    loadChildren: () =>
      import('./userProfile/userProfile.routes').then((m) => m.roues),
  }
];
