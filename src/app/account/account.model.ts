import bcrypt from 'bcryptjs';
import { IAccount } from 'app/account/account';

/**
 * Account model
 */
export class Account implements IAccount {
  id?: number;
  name: string;
  username: string;
  password: string = '';

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
    this.password = password;
  }

  /**
   * Builder for account
   * @param {IAccount} data
   */
  static async build(data: IAccount) {
    const hashedPassword = await Account.hashPassword(data.password);
    return new Account({ ...data, password: hashedPassword });
  }

  /**
   * Hash a passed password
   * @param {string} password
   * @private
   */
  private static hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  /**
   * Compare a hashed password
   * @param {string} password
   * @param {string} hashedPassword
   */
  static comparePassword(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }
}
