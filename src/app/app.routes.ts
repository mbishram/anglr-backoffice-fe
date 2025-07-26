import { Routes } from '@angular/router';
import { Auth } from 'app/auth/auth';
import { Dashboard } from 'app/dashboard/dashboard';
import { authRoutes } from 'app/auth/auth.route';
import { authGuard } from 'app/account/auth.guard';
import { guestGuard } from 'app/account/guest.guard';

export const appRoutes: Routes = [
  // Auth routes
  {
    path: 'auth',
    component: Auth,
    canActivate: [guestGuard],
    canActivateChild: [guestGuard],
    children: [
      // Redirect to login page if user tried to go to '/auth'
      { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
      ...authRoutes,
    ],
  },

  // Dashboard routes
  {
    path: '',
    component: Dashboard,
    canActivate: [authGuard],
    canActivateChild: [authGuard],
  },

  // Redirects
  { path: '**', redirectTo: '/auth/login' },
];
