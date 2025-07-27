import { Component, inject } from '@angular/core';
import { Breadcrumb } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import { toSignal } from '@angular/core/rxjs-interop';
import { EmployeeService } from 'app/employees/employee.service';
import { EmployeesTable } from 'app/employees/employees-table/employees-table';

@Component({
  selector: 'agl-employees',
  imports: [Breadcrumb, EmployeesTable],
  templateUrl: './employees.html',
  styleUrl: './employees.css',
})
export class Employees {
  private employeeService = inject(EmployeeService);

  protected readonly breadcrumbs: MenuItem[] = [{ label: 'Employees' }];
  protected readonly home: MenuItem = { routerLink: '/' };

  protected employees = toSignal(this.employeeService.fetchEmployees());
}
