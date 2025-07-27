import { Injectable, signal } from '@angular/core';
import { Employee } from 'app/employees/employee.model';
import { from } from 'rxjs';
import { db } from 'db';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  protected employees = signal<Employee[]>([]);
  protected employeeMap = signal<Map<number, Employee>>(new Map());

  /**
   * Get employees data
   */
  fetchEmployees() {
    return from(
      (async () => {
        // If employees cache doesn't exist, fetch them from db
        if (!this.employees().length)
          this.employees.set(
            await Promise.all(
              (await db.employees.toArray()).map((data) => new Employee(data)),
            ),
          );

        return this.employees();
      })(),
    );
  }

  /**
   * Get employee by id
   * @param {number} id
   */
  fetchEmployee(id: number) {
    return from(
      (async () => {
        // Return cache if it exist
        if (this.employeeMap().has(id)) return this.employeeMap().get(id);

        // If there's no cache, get them from db
        const dbEmployee = await db.employees.get(id);

        // Return error if it doesn't exist
        if (!dbEmployee)
          return Promise.reject(new Error('Employee not found!'));

        // Adding to cache
        const employee = new Employee(dbEmployee);
        // Creating new map to trigger Angular's signal detection
        this.employeeMap.update((prev) => {
          const latest = new Map(prev);
          latest.set(id, employee);
          return latest;
        });

        return employee;
      })(),
    );
  }
}
