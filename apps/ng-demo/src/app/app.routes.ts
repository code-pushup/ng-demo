import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('../pages/home/home.component'),
  },
  {
    path: 'tag/:tag',
    pathMatch: 'full',
    loadComponent: () => import('../pages/home/home.component'),
  },
  {
    path: 'videos',
    loadComponent: () => import('../pages/videos/videos.component'),
  },
  {
    path: 'users/:username',
    loadComponent: () => import('../pages/user-profile/user-profile.component'),
  },
  {
    path: ':user/:slug',
    loadComponent: () =>
      import('../pages/article-detail/article-detail.component'),
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
