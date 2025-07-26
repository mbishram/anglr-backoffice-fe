import { inject, Injectable } from '@angular/core';
import { Account } from 'app/account/account.model';
import { db } from 'db';
import { from } from 'rxjs';
import { HttpResponse, HttpStatusCode } from '@angular/common/http';
import { LoggerService } from 'app/logger.service';
import { IAccount } from 'app/account/account';

/**
 * Service to handle app's account
 */
@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private loggerService = inject(LoggerService);

  accounts: Account[] = [];
  currentAccount: Account | null = null;

  login() {
    // TODO: Check password with user.
    //   If matched, safe account, save jwt to local storage
    //   save account to attribute
  }

  /**
   * Register a new account
   * @param {Omit<IAccount, 'id'>} data
   */
  register(data: Omit<IAccount, 'id'>) {
    return from(
      (async () => {
        if (await this.isUsernameExist(data.username)) {
          const error = new Error('Username already exist!');

          this.loggerService.error(error);

          return Promise.reject(
            new HttpResponse({
              status: HttpStatusCode.Forbidden,
              statusText: 'Forbidden',
              body: error,
            }),
          );
        }

        const account = await Account.build(data);
        account.id = await db.account.add({
          ...account,
          password: account.plainPassword,
        });

        this.addAccountToCache(account);

        this.loggerService.success(account);

        return new HttpResponse({ body: account });
      })(),
    );
  }

  /**
   * Get all accounts from db or cache if it exist
   */
  fetchAccounts() {
    return from(
      (async () => {
        // If accounts cache doesn't exist, fetch them from db
        if (!this.accounts.length)
          this.accounts = await Promise.all(
            (await db.account.toArray()).map(Account.build),
          );

        return this.accounts;
      })(),
    );
  }

  isAuthenticated(): boolean {
    // TODO: Check if jwt exist from local storage
    //   If it do, check if it is still valid, return result in boolean
    return false;
  }

  /**
   * Add account to service cache
   * @param {Account} account
   * @private
   */
  private addAccountToCache(account: Account) {
    return this.accounts.push(account);
  }

  /**
   * Check if `username` already exist on db
   * @param {string} username
   * @private
   */
  private async isUsernameExist(username: string) {
    return (await db.account.where('username').equals(username).count()) > 0;
  }

  private saveJWT() {
    // TODO: Generate and, save JWT to local storage
  }

  private parseJWT() {
    // TODO: Get jwt from storage and Parsed them, return result
  }
}
