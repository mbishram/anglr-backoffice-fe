import { Routes } from '@angular/router';
import { Auth } from 'app/auth/auth';
import { Dashboard } from 'app/dashboard/dashboard';
import { authRoutes } from 'app/auth/auth.route';

export const appRoutes: Routes = [
  // Auth routes
  {
    path: 'auth',
    component: Auth,
    children: [
      // Redirect to login page if user tried to go to '/auth'
      { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
      ...authRoutes,
    ],
  },

  // Dashboard routes
  { path: '', component: Dashboard },
  { path: 'test', component: Dashboard },

  // Redirects
  { path: '**', redirectTo: '/auth/login' },
];
