import type { Data, Route, Routes } from '@angular/router';

/**
 * Extension to angular `Route` interface with added typings for `data.imgSrc` which is the source of layout image.
 *
 * @usageNotes
 *
 * ### Basic Example
 *
 * ```ts
 * {
 *   path: 'auth-child',
 *   component: AuthChild,
 *   data: { imgSrc: 'asset/images/image-src.jpg' },
 * }
 * ```
 *
 * @see {@link Route}
 */
interface AuthRoute extends Route {
  data: { imgSrc: string; imgAlt: string } & Data;
}

/**
 * List of auth route configuration.
 *
 * @see {@link AuthRoute}
 * @see {@link Routes}
 */
type AuthRoutes = AuthRoute[];
