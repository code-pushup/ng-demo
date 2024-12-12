import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('../pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'tag/:tag',
    pathMatch: 'full',
    loadChildren: () =>
      import('../pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'videos',
    loadChildren: () =>
      import('../pages/videos/videos.module').then((m) => m.VideosModule),
  },
  {
    path: 'users/:username',
    loadChildren: () =>
      import('../pages/user-profile/user-profile.module').then(
        (m) => m.UserProfileModule
      ),
  },
  {
    path: ':user/:slug',
    loadChildren: () =>
      import('../pages/article-detail/article-detail.module').then(
        (m) => m.ArticleDetailModule
      ),
  },
  {
    path: 'not-found',
    pathMatch: 'full',
    loadComponent: () => import('../pages/not-found/not-found.component'),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'not-found',
  },
];
