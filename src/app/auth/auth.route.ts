import type { AuthRoutes } from 'app/auth/auth.d';
import { Register } from 'app/register/register';
import { Login } from 'app/login/login';

export const authRoutes: AuthRoutes = [
  {
    path: 'login',
    component: Login,
    data: { imgSrc: 'assets/images/file-cabinet.jpg', imgAlt: 'File cabinet' },
    title: 'Login',
  },
  {
    path: 'register',
    component: Register,
    data: {
      imgSrc: 'assets/images/file-cabinet-write.jpg',
      imgAlt: 'File cabinet with person writing',
    },
    title: 'Register',
  },
];
