import { inject, Injectable } from '@angular/core';
import { Account } from 'app/account/account.model';
import { db } from 'db';
import { from } from 'rxjs';
import { HttpResponse, HttpStatusCode } from '@angular/common/http';
import { LoggerService } from 'app/logger.service';

/**
 * Service to handle app's account
 */
@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private loggerService = inject(LoggerService);

  // account: Account;

  login() {
    // TODO: Check password with user.
    //   If matched, safe account, save jwt to local storage
    //   save account to attribute
  }

  /**
   * Register a new account
   * @param {Omit<Account, 'id'>} data
   */
  register(data: Omit<Account, 'id'>) {
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
        account.id = await db.account.add(account);
        const { password, ...filteredAccount } = account;

        this.loggerService.success(filteredAccount);

        return new HttpResponse({ body: filteredAccount });
      })(),
    );
  }

  getAccount() {
    // TODO: Return cached account, which is account, if isAuthenticated
  }

  isAuthenticated(): boolean {
    // TODO: Check if jwt exist from local storage
    //   If it do, check if it is still valid, return result in boolean
    return false;
  }

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
