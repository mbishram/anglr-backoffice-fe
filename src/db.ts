import Dexie, { Table } from 'dexie';
import { IAccount } from 'app/account/account';
import { Account } from 'app/account/account.model';
import { Employee } from 'app/employees/employee.model';
import { faker } from '@faker-js/faker';

export class Db extends Dexie {
  account!: Table<IAccount, number>;
  employees!: Table<IEmployee, number>;

  constructor() {
    super('anglr');

    this.version(1).stores({
      account: '++id, name, &username, password',
      employees:
        '++id, username, firstName, lastName, email, birthDate, basicSalary, status, group, description',
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

    const employees = db.table<IEmployee>('employees');
    // Populate employee table if it's empty
    if ((await employees.count()) < 1) {
      const mockEmployees: Employee[] = Array(322)
        .fill({})
        .map(
          (_, index) =>
            new Employee({
              id: index,
              username: faker.internet.username(),
              firstName: faker.person.firstName(),
              lastName: faker.person.lastName(),
              email: faker.internet.email(),
              birthDate: faker.date.birthdate(),
              basicSalary: faker.helpers.rangeToNumber({
                min: 1000000,
                max: 20000000,
              }),
              status: faker.helpers.arrayElement(Employee.STATUS_OPTIONS),
              group: faker.helpers.arrayElement(Employee.GROUP_OPTIONS),
              description: faker.date.past(),
            }),
        );
      await employees.bulkAdd(mockEmployees);
    }
  }
}

export const db = new Db();
