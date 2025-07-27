import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validate max date
 * @param {Date} maxDate
 */
export const maxDateValidator =
  (maxDate: Date): ValidatorFn =>
  (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) return null;

    const selectedDate = new Date(control.value);

    return selectedDate > maxDate
      ? { maxDate: { max: maxDate, actual: selectedDate } }
      : null;
  };
