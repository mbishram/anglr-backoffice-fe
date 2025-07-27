import { Injectable, signal } from '@angular/core';
import { Employee } from 'app/employees/employee.model';
import { from } from 'rxjs';
import { db } from 'db';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  protected employees = signal<Employee[]>([]);

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
}
