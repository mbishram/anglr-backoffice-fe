import { inject, Injectable } from '@angular/core';
import { Account } from 'app/account/account.model';
import { db } from 'db';
import { from } from 'rxjs';
import { HttpResponse, HttpStatusCode } from '@angular/common/http';
import { LoggerService } from 'app/logger.service';
import { IAccount } from 'app/account/account';
import { Jwt } from 'app/jwt.model';

/**
 * Service to handle app's account
 */
@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private loggerService = inject(LoggerService);

  accounts: Account[] = [];
  loggedInAccount: Account | null = null;

  /**
   * Local storage access token key name
   */
  private static ACCESS_TOKEN_KEY = 'ACCESS_TOKEN_KEY';

  login(data: Omit<IAccount, 'id' | 'name'>) {
    return from(
      (async () => {
        const dbAccount = await db.account
          .where('username')
          .equals(data.username)
          .first();

        if (!dbAccount) {
          const error = new Error('Account not found!');

          this.loggerService.error(error);

          return Promise.reject(
            new HttpResponse({
              status: HttpStatusCode.NotFound,
              statusText: 'Not Found',
              body: error,
            }),
          );
        }

        const account = await Account.build(dbAccount);

        if (account.isPasswordMatched(data.password)) {
          // Adding to cache
          this.loggedInAccount = account;

          await this.saveToken();

          this.loggerService.success(account);

          return new HttpResponse({ body: account });
        } else {
          const error = new Error('Unauthorized account!');

          this.loggerService.error(error);

          return Promise.reject(
            new HttpResponse({
              status: HttpStatusCode.Unauthorized,
              statusText: 'Unauthorized',
              body: error,
            }),
          );
        }
      })(),
    );
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

        // Adding to cache
        this.accounts.push(account);

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

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    return from(
      (async () => {
        try {
          await this.parseToken();
          return true;
        } catch (error) {
          this.loggerService.error(error);
          return false;
        }
      })(),
    );
  }

  /**
   * Check if `username` already exist on db
   * @param {string} username
   * @private
   */
  private async isUsernameExist(username: string) {
    return (await db.account.where('username').equals(username).count()) > 0;
  }

  /**
   * Generate and saving token to local storage
   * @private
   */
  private async saveToken() {
    if (this.loggedInAccount) {
      const token = await Jwt.sign({ ...this.loggedInAccount });
      localStorage.setItem(AccountService.ACCESS_TOKEN_KEY, token);
    }
  }

  /**
   * Get parsed token data
   * @private
   */
  private async parseToken() {
    const token = localStorage.getItem(AccountService.ACCESS_TOKEN_KEY);
    if (!token) {
      throw new Error('Token not found!');
    }

    return Jwt.verify(token);
  }
}
