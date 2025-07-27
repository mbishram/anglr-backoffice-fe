import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validate to be numeric only
 */
export const numericValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const value = control.value;

  if (!value) return null;

  const numericRegex = /^[0-9]+$/;

  return !numericRegex.test(value) ? { numeric: false } : null;
};
