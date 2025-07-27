import { Component, inject } from '@angular/core';
import { Breadcrumb } from 'primeng/breadcrumb';
import { MenuItem, MessageService } from 'primeng/api';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { maxDateValidator } from 'app/max-date.validator';
import { IftaLabel } from 'primeng/iftalabel';
import { InputText } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { ValidatorMessageImpurePipe } from 'app/validator-message.pipe';
import { DatePicker } from 'primeng/datepicker';
import { InputNumber } from 'primeng/inputnumber';
import { Employee } from 'app/employees/employee.model';
import { Select } from 'primeng/select';
import { Tag } from 'primeng/tag';

@Component({
  selector: 'agl-employees-create',
  imports: [
    Breadcrumb,
    Card,
    Button,
    RouterLink,
    ReactiveFormsModule,
    IftaLabel,
    InputText,
    Message,
    ValidatorMessageImpurePipe,
    DatePicker,
    InputNumber,
    Select,
    Tag,
  ],
  templateUrl: './employees-create.html',
  styleUrl: './employees-create.css',
})
export class EmployeesCreate {
  private formBuilder = inject(FormBuilder).nonNullable;
  private router = inject(Router);
  private messageService = inject(MessageService);

  protected readonly breadcrumbs: MenuItem[] = [
    { label: 'Employees', routerLink: '/employees' },
    { label: 'Create' },
  ];
  protected readonly home: MenuItem = { routerLink: '/' };
  protected readonly birthDateMaxDate = new Date();
  protected readonly Employee = Employee;

  protected form = this.formBuilder.group({
    username: ['', [Validators.required]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    birthDate: [
      '',
      [Validators.required, maxDateValidator(this.birthDateMaxDate)],
    ],
    basicSalary: [null as any as number, [Validators.required]],
    status: ['', [Validators.required]],
    group: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });

  /**
   * Submit form
   */
  protected submitForm() {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Employee created successfully!',
      });

      this.form.reset();

      void this.router.navigate(['/employees']);
    }
  }
}
