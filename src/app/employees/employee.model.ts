export class Employee implements IEmployee {
  id?: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string | Date;
  basicSalary: number;
  status: EmployeeStatus = 'active';
  group: EmployeeGroup = 'staff';
  description: string | Date;

  /**
   * List of status options
   */
  static STATUS_OPTIONS: EmployeeStatus[] = ['active', 'inactive'] as const;

  /**
   * List of group options
   */
  static GROUP_OPTIONS: EmployeeGroup[] = [
    'marketing',
    'hr',
    'it',
    'manager',
    'ceo',
    'cto',
    'vp',
    'accountant',
    'sales',
    'staff',
    'payroll',
  ];

  /**
   * Constructor of employee model
   * @param {IEmployee} data
   */
  constructor(data: IEmployee) {
    this.id = data.id;
    this.username = data.username;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.birthDate = data.birthDate;
    this.basicSalary = data.basicSalary;
    this.status = data.status as EmployeeStatus;
    this.group = data.group;
    this.description = data.description;
  }

  /**
   * Return employees fullname
   */
  get fullName(): string {
    return this.firstName + ' ' + this.lastName;
  }

  /**
   * Return status description
   */
  get statusDescription(): string {
    return Employee.getStatusDescription(this.status);
  }

  /**
   * Return severity level of employee
   */
  get statusSeverity() {
    return Employee.getStatusSeverity(this.status);
  }

  /**
   * Return group description
   */
  get groupDescription(): string {
    return Employee.getGroupDescription(this.group);
  }

  /**
   * Get status description
   * NOTE: It is better to use I18n, but I did not set them up in this project
   */
  static getStatusDescription(status: EmployeeStatus): string {
    switch (status) {
      case 'active':
        return 'Active';
      case 'inactive':
        return 'Inactive';
      default:
        return '';
    }
  }

  /**
   * Get severity level of employee
   */
  static getStatusSeverity(status: EmployeeStatus) {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'danger';
      default:
        return 'secondary';
    }
  }

  /**
   * Get group description
   * NOTE: It is better to use I18n, but I did not set them up in this project
   */
  static getGroupDescription(group: EmployeeGroup): string {
    switch (group) {
      case 'marketing':
        return 'Marketing';
      case 'hr':
        return 'Human Resource';
      case 'it':
        return 'Information Technology';
      case 'manager':
        return 'Manager';
      case 'ceo':
        return 'Chief Executive Officer';
      case 'cto':
        return 'Chief Technology Officer';
      case 'vp':
        return 'Vice President';
      case 'accountant':
        return 'Accountant';
      case 'sales':
        return 'Sales';
      case 'staff':
        return 'Staff';
      case 'payroll':
        return 'Payroll';
      default:
        return '';
    }
  }
}
