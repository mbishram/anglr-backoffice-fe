interface IEmployee {
  id?: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string | Date;
  basicSalary: number;
  status: EmployeeStatus;
  group: EmployeeGroup;
  description: string | Date; // NOTE: It is in the requirement, description = datetime
}

type EmployeeStatus = 'active' | 'inactive';

type EmployeeGroup =
  | 'marketing'
  | 'hr'
  | 'it'
  | 'manager'
  | 'ceo'
  | 'cto'
  | 'vp'
  | 'accountant'
  | 'sales'
  | 'staff'
  | 'payroll';
