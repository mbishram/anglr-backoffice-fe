import Dexie, { Table } from 'dexie';
import { IAccount } from 'app/account/account';
import { Account } from 'app/account/account.model';

export class Db extends Dexie {
  account!: Table<IAccount, number>;

  constructor() {
    super('anglr');

    this.version(1).stores({
      account: '++id, name, &username, password',
    });

    this.on('ready', Db.seed);
  }

  private static async seed(db: Dexie) {
    const accounts = db.table<IAccount>('account');

    // Populate account table only if it's empty
    if ((await accounts.count()) < 1) {
      const account = await Account.build({
        name: 'Admin',
        username: 'admin',
        password: 'admin',
      });
      await accounts.add({ ...account, password: account.plainPassword });
    }
  }
}

export const db = new Db();
