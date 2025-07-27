import type { AuthRoutes } from 'app/auth/auth.d';

export const authRoutes: AuthRoutes = [
  {
    path: 'login',
    loadComponent: () => import('app/login/login').then((m) => m.Login),
    data: { imgSrc: 'assets/images/file-cabinet.jpg', imgAlt: 'File cabinet' },
    title: 'Login',
  },
  {
    path: 'register',
    loadComponent: () =>
      import('app/register/register').then((m) => m.Register),
    data: {
      imgSrc: 'assets/images/file-cabinet-write.jpg',
      imgAlt: 'File cabinet with person writing',
    },
    title: 'Register',
  },
];
