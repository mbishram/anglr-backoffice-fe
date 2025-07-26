import { Component, inject, model, Signal } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { Button } from 'primeng/button';
import { toSignal } from '@angular/core/rxjs-interop';
import { AccountService } from 'app/account/account.service';
import { Account } from 'app/account/account.model';

@Component({
  selector: 'agl-login-account-dialog',
  imports: [Dialog, Button],
  templateUrl: './login-account-dialog.html',
  styleUrl: './login-account-dialog.css',
})
export class LoginAccountDialog {
  private accountService = inject(AccountService);

  visible = model(false);
  protected accounts: Signal<Account[]> = toSignal(
    this.accountService.fetchAccounts(),
    {
      initialValue: [],
    },
  );
}
