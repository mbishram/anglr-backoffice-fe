import { IAccount } from 'app/account/account';

/**
 * Account model
 */
export class Account implements IAccount {
  id?: number;
  name: string;
  username: string;
  #password: string;

  /**
   * Private constructor of account model
   * @param {IAccount} data
   * @private
   */
  private constructor(data: IAccount) {
    const { id, name, username, password } = data;
    this.id = id;
    this.name = name;
    this.username = username;
    this.#password = password; // Private password so that it doesn't get returned
  }

  /**
   * Password setter.
   * Making it like this instead of public, so that password doesn't get returned by default
   * @param password
   */
  set password(password: string) {
    this.#password = password;
  }

  /**
   * Return plain password
   * WARNING: NEVER DO THIS! DOING IT HERE FOR DEMONSTRATION PURPOSE ONLY
   */
  get plainPassword() {
    return this.#password;
  }

  /**
   * Builder for account
   * @param {IAccount} data
   */
  static async build(data: IAccount) {
    const hashedPassword = Account.hashPassword(data.password);
    return new Account({ ...data, password: hashedPassword });
  }

  /**
   * Hash a passed password
   * NOTE: I tried doing encryption. Things gets complicated, and I don't have time 😔. Saving plain password for now
   * @param {string} password
   * @private
   */
  private static hashPassword(password: string) {
    return password;
  }

  /**
   * Check password matched
   * NOTE: Was suppose to be checked against encrypted password, alas...
   * @param {string} password
   */
  isPasswordMatched(password: string) {
    return password === this.#password;
  }
}
