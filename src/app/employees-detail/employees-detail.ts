import { Component, inject, signal } from '@angular/core';
import { Breadcrumb } from 'primeng/breadcrumb';
import { MenuItem, MessageService } from 'primeng/api';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EmployeeService } from 'app/employees/employee.service';
import { Employee } from 'app/employees/employee.model';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'agl-employees-detail',
  imports: [Breadcrumb, Card, Button, RouterLink, DatePipe, CurrencyPipe],
  templateUrl: './employees-detail.html',
  styleUrl: './employees-detail.css',
})
export class EmployeesDetail {
  private activatedRoute = inject(ActivatedRoute);
  private employeeService = inject(EmployeeService);
  private router = inject(Router);
  private messageService = inject(MessageService);

  protected readonly breadcrumbs: MenuItem[] = [
    { label: 'Employees', routerLink: '/employees' },
    { label: 'Detail' },
  ];
  protected readonly home: MenuItem = { routerLink: '/' };

  protected employee = signal<Employee | undefined>(undefined);

  constructor() {
    this.activatedRoute.params.subscribe((params) => {
      const id = Number(params['id']);

      if (Number.isNaN(id)) {
        this.messageService.add({
          severity: 'error',
          summary: 'Not Found',
          detail: 'Invalid id sent!',
        });
        void this.router.navigate(['../']);
      }

      this.employeeService.fetchEmployee(id).subscribe({
        next: (data) => {
          this.employee.set(data);
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Not Found',
            detail: 'Employee not found!',
          });
          void this.router.navigate(['../']);
        },
      });
    });
  }

  /**
   * Action to 'update' employee
   */
  protected update() {
    this.messageService.add({
      severity: 'warn',
      summary: 'Update',
      detail: `Update has been clicked! No implementation yet :(`,
    });
  }

  /**
   * Action to 'delete' employee
   */
  protected delete() {
    this.messageService.add({
      severity: 'error',
      summary: 'Delete',
      detail: `Delete has been clicked! No implementation yet :(`,
    });
  }
}
