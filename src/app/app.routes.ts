import { Routes } from '@angular/router';
import { authRoutes } from 'app/auth/auth.route';
import { authGuard } from 'app/account/auth.guard';
import { guestGuard } from 'app/account/guest.guard';

export const appRoutes: Routes = [
  // Auth routes
  {
    path: 'auth',
    loadComponent: () => import('app/auth/auth').then((m) => m.Auth),
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
    loadComponent: () =>
      import('app/dashboard/dashboard').then((m) => m.Dashboard),
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      // Redirect to employees page if user tried to go to '/'
      { path: '', redirectTo: '/employees', pathMatch: 'full' },
      {
        path: 'employees',
        loadComponent: () =>
          import('app/employees/employees').then((m) => m.Employees),
        title: 'Employees',
      },
      {
        path: 'employees/create',
        loadComponent: () =>
          import('app/employees-create/employees-create').then(
            (m) => m.EmployeesCreate,
          ),
        title: 'Create Employee',
      },
      {
        path: 'employees/:id',
        loadComponent: () =>
          import('app/employees-detail/employees-detail').then(
            (m) => m.EmployeesDetail,
          ),
        title: 'Detail Employee',
      },
    ],
  },

  // Redirects
  { path: '**', redirectTo: '/' },
];
