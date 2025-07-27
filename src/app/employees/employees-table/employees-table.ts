import {
  AfterViewInit,
  Component,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { Table, TableModule } from 'primeng/table';
import { Employee } from 'app/employees/employee.model';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Tag } from 'primeng/tag';
import { Tooltip } from 'primeng/tooltip';
import { MultiSelect } from 'primeng/multiselect';
import isNil from 'lodash.isnil';
import isEmpty from 'lodash.isempty';
import { FormsModule } from '@angular/forms';
import { FilterMetadata, MessageService } from 'primeng/api';

@Component({
  selector: 'agl-employees-table',
  imports: [
    Button,
    Card,
    IconField,
    InputIcon,
    InputText,
    TableModule,
    RouterLink,
    DatePipe,
    CurrencyPipe,
    Tag,
    Tooltip,
    MultiSelect,
    FormsModule,
  ],
  templateUrl: './employees-table.html',
  styleUrl: './employees-table.css',
})
export class EmployeesTable implements AfterViewInit {
  private messageService = inject(MessageService);

  readonly employees = input<Employee[]>();

  protected readonly Employee = Employee;

  protected statusFilter = [];
  protected groupFilter = [];
  protected isFiltered = signal(false);
  protected table = viewChild<Table<Employee>>(Table);

  ngAfterViewInit() {
    const table = this.table();
    if (table) {
      // NOTE: Because we're saving filter state and using custom input for these two columns,
      // we need to set the value programatically, so it keeps in sync with the saved filter values when they first got loaded
      this.setUnhandledFilter(table);
    }
  }

  /**
   * Do filter global
   * @param {Table<Employee>} table
   * @param {Event} event
   * @protected
   */
  protected filterGlobal(table: Table<Employee>, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  /**
   * Clear filter global value
   * @param {Table<Employee>} table
   * @protected
   */
  protected clearFilter(table: Table<Employee>) {
    // Reset sort
    // NOTE: This hack bought to you by https://github.com/primefaces/primeng/issues/10586#issuecomment-1218075718
    table.sortField = 'id';
    table.sortOrder = 1;
    table.sortSingle();

    // Clear filter state
    table.clear();

    // Save the state to local storage
    table.saveState();

    // Reset the custom filter field
    this.statusFilter = [];
    this.groupFilter = [];

    // Set the isFiltered flag
    this.isFiltered.set(false);
  }

  /**
   * Set filter value for custom columns
   * @param {Table<Employee>} table
   * @protected
   */
  protected setUnhandledFilter(table: Table<Employee>) {
    const { filters } = table;

    // Set input filter of status and group column.
    // NOTE: Because we're saving filter state and using custom input for these two columns,
    // we need to set the value programatically, so it keeps in sync with the saved filter values when they first got loaded
    this.statusFilter =
      (filters['status'] as FilterMetadata[])?.[0]?.value ?? [];
    this.groupFilter = (filters['group'] as FilterMetadata[])?.[0]?.value ?? [];
  }

  /**
   * Check filter status of table and sync them to `this.isFiltered`
   * @param {Table<Employee>} table
   */
  protected checkFilteredStatus(table: Table<Employee>) {
    const { filters, sortField } = table;

    // Return early if filter or sort is empty
    if (!filters && !sortField) {
      this.isFiltered.set(false);
      return;
    }

    // Set is filtered status
    this.isFiltered.set(
      Object.values(filters)
        .flat()
        .map((meta) => {
          if (!meta) return false;

          // If multi select
          if (typeof meta.value === 'object' && meta.value !== null)
            return !isEmpty(meta.value);

          return !isNil(meta.value);
        })
        .some(Boolean) || !!sortField,
    );
  }

  /**
   * Action to 'update' employee
   * @param {Employee} employee
   */
  protected updateEmployee(employee: Employee) {
    this.messageService.add({
      severity: 'warn',
      summary: 'Update',
      detail: `Update for "${employee.fullName}" has been clicked! No implementation yet :(`,
    });
  }

  /**
   * Action to 'delete' employee
   * @param {Employee} employee
   */
  protected deleteEmployee(employee: Employee) {
    this.messageService.add({
      severity: 'error',
      summary: 'Delete',
      detail: `Delete for "${employee.fullName}" has been clicked! No implementation yet :(`,
    });
  }
}
