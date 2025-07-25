import Dexie, { Table } from 'dexie';
import { Account } from 'app/account/account.model';

export class Db extends Dexie {
  account!: Table<Account, number>;

  constructor() {
    super('anglr');

    this.version(1).stores({
      account: '++id, name, &username, password',
    });

    this.on('ready', Db.seed);
  }

  private static async seed(db: Dexie) {
    const account = db.table<Account>('account');

    // Populate account table only if it's empty
    if ((await account.count()) < 1) {
      await account.add(
        await Account.build({
          name: 'Admin',
          username: 'admin',
          password: 'admin',
        }),
      );
    }
  }
}

export const db = new Db();
