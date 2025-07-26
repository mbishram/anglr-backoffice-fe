import { CanActivateChildFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AccountService } from 'app/account/account.service';
import { map } from 'rxjs';
import { MessageService } from 'primeng/api';

/**
 * Guard to prevent access to /auth pages when logged in
 */
export const guestGuard: CanActivateChildFn = () => {
  const accountService = inject(AccountService);
  const router = inject(Router);
  const messageService = inject(MessageService);

  return accountService.isAuthenticated().pipe(
    map((isAuthenticated) => {
      if (isAuthenticated) {
        messageService.add({
          severity: 'info',
          summary: 'Logged In',
          detail:
            'You have already logged in. Logout first to access the page!',
        });

        void router.navigate(['/'], { replaceUrl: true });

        return false;
      }

      return true;
    }),
  );
};
