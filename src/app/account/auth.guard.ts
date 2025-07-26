import { CanActivateChildFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AccountService } from 'app/account/account.service';
import { map } from 'rxjs';
import { MessageService } from 'primeng/api';

/**
 * Guard to prevent access dashboard when not logged in
 */
export const authGuard: CanActivateChildFn = () => {
  const accountService = inject(AccountService);
  const router = inject(Router);
  const messageService = inject(MessageService);

  return accountService.isAuthenticated().pipe(
    map((isAuthenticated) => {
      if (!isAuthenticated) {
        messageService.add({
          severity: 'error',
          summary: 'Unauthorized Access',
          detail: 'You need to login first to access the page!',
        });

        void router.navigate(['/auth', 'login'], { replaceUrl: true });

        return false;
      }

      return true;
    }),
  );
};
