import { Routes } from '@angular/router';
import { Auth } from 'app/auth/auth';
import { Dashboard } from 'app/dashboard/dashboard';
import { authRoutes } from 'app/auth/auth.route';
import { authGuard } from 'app/account/auth.guard';
import { guestGuard } from 'app/account/guest.guard';
import { Employees } from 'app/employees/employees';
import { EmployeesDetail } from 'app/employees-detail/employees-detail';
import { EmployeesCreate } from 'app/employees-create/employees-create';

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
    children: [
      // Redirect to employees page if user tried to go to '/'
      { path: '', redirectTo: '/employees', pathMatch: 'full' },
      { path: 'employees', component: Employees, title: 'Employees' },
      {
        path: 'employees/create',
        component: EmployeesCreate,
        title: 'Create Employee',
      },
      {
        path: 'employees/:id',
        component: EmployeesDetail,
        title: 'Detail Employee',
      },
    ],
  },

  // Redirects
  { path: '**', redirectTo: '/' },
];
